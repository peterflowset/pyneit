import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false },
};

export default function ImpressumPage() {
  return (
    <section className="min-h-screen bg-bg-white text-text-primary pt-32 pb-28">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <h1 className="font-serif text-3xl md:text-5xl tracking-wide mb-16">
          Impressum
        </h1>

        <div className="prose prose-sm max-w-none font-sans text-text-muted space-y-8 [&_h2]:font-serif [&_h2]:text-text-primary [&_h2]:text-xl [&_h2]:tracking-wide [&_h2]:mt-12 [&_h2]:mb-4 [&_p]:leading-relaxed">
          <h2>Angaben gemäß Art. 5 TMG / Art. 2 D.Lgs. 70/2003</h2>
          <p>
            Pyneit<br />
            Weinbergweg 1<br />
            39100 Bozen (BZ)<br />
            Südtirol, Italien
          </p>

          <h2>Kontakt</h2>
          <p>
            Telefon: +39 0471 000 000<br />
            E-Mail: info@pyneit.com
          </p>

          <h2>Steuernummer</h2>
          <p>
            MwSt.-Nr. / P.IVA: IT00000000000<br />
            Steuernummer / Codice Fiscale: 00000000000
          </p>

          <h2>Registereintrag</h2>
          <p>
            Handelsregister Bozen / Registro Imprese di Bolzano<br />
            REA-Nr.: BZ-000000
          </p>

          <h2>Verantwortlich für den Inhalt</h2>
          <p>
            Pyneit<br />
            Weinbergweg 1<br />
            39100 Bozen, Italien
          </p>

          <h2>Streitschlichtung</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur
            Online-Streitbeilegung (OS) bereit:{" "}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-primary hover:underline"
            >
              ec.europa.eu/consumers/odr
            </a>
          </p>

          <h2>Hinweis zum Alkoholkonsum</h2>
          <p>
            Der Verkauf von Alkohol an Minderjährige unter 18 Jahren ist
            gesetzlich verboten. Alkoholische Getränke sollten verantwortungsvoll
            genossen werden.
          </p>
        </div>
      </div>
    </section>
  );
}
