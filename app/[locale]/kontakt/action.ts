"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(200),
  subject: z.string().min(1).max(200),
  message: z.string().min(1).max(5000),
});

export type ContactState = {
  success: boolean;
  error: string | null;
};

export async function submitContact(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  };

  const result = contactSchema.safeParse(raw);
  if (!result.success) {
    return { success: false, error: "Validation failed" };
  }

  // TODO: Send email via Resend, SendGrid, or similar
  console.log("Contact form submission:", result.data);

  return { success: true, error: null };
}
