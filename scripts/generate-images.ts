import { existsSync, mkdirSync, writeFileSync, statSync, readFileSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";
import { imagePrompts, type ImagePrompt } from "./image-prompts";

// Load .env.local
const envPath = join(process.cwd(), ".env.local");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf-8").split("\n")) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) process.env[match[1].trim()] ??= match[2].trim();
  }
}

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "google/gemini-3-pro-image-preview";
const OUTPUT_DIR = join(process.cwd(), "public", "images");
const TMP_DIR = join(process.cwd(), ".tmp-images");
const MIN_FILE_SIZE = 100; // bytes — files smaller than this are considered placeholders

interface OpenRouterResponse {
  choices: Array<{
    message: {
      content?: string;
      images?: Array<{
        image_url: {
          url: string; // "data:image/png;base64,..." or raw base64
        };
      }>;
    };
  }>;
  error?: { message: string; code: number };
}

function getApiKey(): string {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) {
    console.error(
      "OPENROUTER_API_KEY not set. Add it to .env.local or export it."
    );
    process.exit(1);
  }
  return key;
}

function parseArgs(): { force: boolean; only: string | null } {
  const args = process.argv.slice(2);
  let force = false;
  let only: string | null = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--force") {
      force = true;
    } else if (args[i] === "--only" && args[i + 1]) {
      only = args[i + 1];
      i++;
    }
  }

  return { force, only };
}

function shouldGenerate(filename: string, force: boolean): boolean {
  if (force) return true;

  const filepath = join(OUTPUT_DIR, `${filename}.webp`);
  if (!existsSync(filepath)) return true;

  const stats = statSync(filepath);
  return stats.size < MIN_FILE_SIZE;
}

async function generateImage(
  prompt: ImagePrompt,
  apiKey: string
): Promise<Buffer> {
  console.log(`  Calling OpenRouter API (${MODEL})...`);

  const body = {
    model: MODEL,
    messages: [{ role: "user", content: prompt.prompt }],
    modalities: ["image", "text"],
    image_config: {
      aspect_ratio: prompt.aspectRatio,
      image_size: "2K",
    },
  };

  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://pyneid.com",
      "X-Title": "Pyneid Image Generation",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API error ${response.status}: ${text}`);
  }

  const data = (await response.json()) as OpenRouterResponse;

  if (data.error) {
    throw new Error(`API error: ${data.error.message}`);
  }

  const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
  if (!imageUrl) {
    const content = data.choices?.[0]?.message?.content;
    throw new Error(
      `No image in response. Text response: ${content?.slice(0, 200) ?? "none"}`
    );
  }

  // Strip data URI prefix if present
  const base64Data = imageUrl.replace(/^data:image\/\w+;base64,/, "");
  return Buffer.from(base64Data, "base64");
}

function compressToWebp(pngPath: string, outputPath: string): void {
  console.log(`  Compressing to WebP...`);
  execSync(
    `cwebp -q 80 -resize 1920 0 "${pngPath}" -o "${outputPath}" 2>/dev/null`
  );
}

async function processPrompt(
  prompt: ImagePrompt,
  apiKey: string
): Promise<void> {
  const pngPath = join(TMP_DIR, `${prompt.filename}.png`);
  const webpPath = join(OUTPUT_DIR, `${prompt.filename}.webp`);

  // Generate image via API
  const pngBuffer = await generateImage(prompt, apiKey);
  writeFileSync(pngPath, pngBuffer);
  console.log(`  PNG saved (${(pngBuffer.length / 1024).toFixed(0)} KB)`);

  // Compress to WebP
  compressToWebp(pngPath, webpPath);

  const webpStats = statSync(webpPath);
  console.log(
    `  WebP saved: ${webpPath} (${(webpStats.size / 1024).toFixed(0)} KB)`
  );
}

async function main(): Promise<void> {
  const { force, only } = parseArgs();
  const apiKey = getApiKey();

  // Ensure directories exist
  mkdirSync(OUTPUT_DIR, { recursive: true });
  mkdirSync(TMP_DIR, { recursive: true });

  // Filter prompts
  let prompts = imagePrompts;
  if (only) {
    prompts = prompts.filter((p) => p.filename === only);
    if (prompts.length === 0) {
      console.error(`No prompt found for "${only}".`);
      console.error(
        "Available:",
        imagePrompts.map((p) => p.filename).join(", ")
      );
      process.exit(1);
    }
  }

  // Determine which images to generate
  const toGenerate = prompts.filter((p) => shouldGenerate(p.filename, force));

  if (toGenerate.length === 0) {
    console.log("All images already exist. Use --force to regenerate.");
    return;
  }

  console.log(`\nGenerating ${toGenerate.length} image(s)...\n`);

  let success = 0;
  let failed = 0;

  // Process sequentially to respect rate limits
  for (const prompt of toGenerate) {
    console.log(
      `[${success + failed + 1}/${toGenerate.length}] ${prompt.filename} (${prompt.aspectRatio})`
    );

    try {
      await processPrompt(prompt, apiKey);
      success++;
      console.log(`  Done.\n`);
    } catch (error) {
      failed++;
      console.error(
        `  FAILED: ${error instanceof Error ? error.message : error}\n`
      );
    }

    // Small delay between requests
    if (success + failed < toGenerate.length) {
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  // Cleanup tmp
  try {
    execSync(`rm -rf "${TMP_DIR}"`);
  } catch {
    // ignore cleanup errors
  }

  console.log(`\nComplete: ${success} generated, ${failed} failed.`);
}

main();
