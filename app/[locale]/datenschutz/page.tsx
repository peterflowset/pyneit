import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  robots: { index: false },
};

export default function DatenschutzPage() {
  return (
    <section className="min-h-screen bg-bg-white text-text-primary pt-32 pb-28">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <h1 className="font-serif text-3xl md:text-5xl tracking-wide mb-16">
          Datenschutzerklärung
        </h1>

        <div className="prose prose-sm max-w-none font-sans text-text-muted space-y-8 [&_h2]:font-serif [&_h2]:text-text-primary [&_h2]:text-xl [&_h2]:tracking-wide [&_h2]:mt-12 [&_h2]:mb-4 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2">
          <h2>1. Datenschutz auf einen Blick</h2>
          <p>
            Die folgenden Hinweise geben einen Überblick darüber, was mit Ihren
            personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
          </p>

          <h2>2. Verantwortliche Stelle</h2>
          <p>
            Pyneit<br />
            Weinbergweg 1<br />
            39100 Bozen (BZ), Südtirol, Italien<br />
            E-Mail: info@pyneit.com
          </p>

          <h2>3. Datenerfassung auf dieser Website</h2>
          <p>
            <strong>Hosting:</strong> Diese Website wird bei einem externen
            Hosting-Anbieter gehostet. Die personenbezogenen Daten, die auf
            dieser Website erfasst werden, werden auf den Servern des Hosters
            gespeichert.
          </p>
          <p>
            <strong>Server-Log-Dateien:</strong> Der Provider erhebt und
            speichert automatisch Informationen in sogenannten
            Server-Log-Dateien, die Ihr Browser automatisch übermittelt (z.B.
            Browsertyp, Betriebssystem, Referrer URL, IP-Adresse, Uhrzeit der
            Serveranfrage).
          </p>

          <h2>4. Kontaktformular</h2>
          <p>
            Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden
            Ihre Angaben zur Bearbeitung der Anfrage bei uns gespeichert. Diese
            Daten geben wir nicht ohne Ihre Einwilligung weiter.
          </p>

          <h2>5. Zahlungsabwicklung (Stripe)</h2>
          <p>
            Für die Zahlungsabwicklung nutzen wir den Dienst Stripe (Stripe
            Inc., 510 Townsend Street, San Francisco, CA 94103, USA). Beim
            Kaufvorgang werden Sie an Stripe weitergeleitet. Die
            Datenschutzerklärung von Stripe finden Sie unter:{" "}
            <a
              href="https://stripe.com/de/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-primary hover:underline"
            >
              stripe.com/de/privacy
            </a>
          </p>

          <h2>6. Cookies</h2>
          <p>
            Diese Website verwendet Cookies zur Altersverifikation. Dieses
            Cookie speichert, ob Sie bestätigt haben, dass Sie über 18 Jahre alt
            sind. Es enthält keine personenbezogenen Daten und wird nach 30
            Tagen gelöscht.
          </p>

          <h2>7. Ihre Rechte (DSGVO / GDPR)</h2>
          <p>Sie haben folgende Rechte:</p>
          <ul>
            <li>Auskunftsrecht (Art. 15 DSGVO)</li>
            <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
            <li>Recht auf Löschung (Art. 17 DSGVO)</li>
            <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
          </ul>

          <h2>8. Beschwerderecht</h2>
          <p>
            Sie haben das Recht, sich bei der zuständigen
            Datenschutz-Aufsichtsbehörde zu beschweren. Zuständige
            Aufsichtsbehörde in Südtirol ist der Garante per la protezione dei
            dati personali.
          </p>
        </div>
      </div>
    </section>
  );
}
