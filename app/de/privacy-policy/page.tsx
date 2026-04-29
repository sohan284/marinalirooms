'use client';

import PolicyPage from '@/components/common/PolicyPage';

export default function PrivacyPolicyDE() {
  return (
    <PolicyPage
      title="Datenschutzerklärung"
      content={

        <div className="space-y-6 text-left">
          <p className="text-sm opacity-60 italic">Letzte Aktualisierung: April 2026</p>
          
          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">1. Verantwortlicher</h2>
          <p>
            <strong>Marinali Rooms</strong><br />
            Adresse: Via O. Marinali, 13 - 36061 Bassano del Grappa (Italy)<br />
            E-Mail: <a href="mailto:welcome@marinalirooms.com" className="underline hover:text-primary transition-colors">welcome@marinalirooms.com</a>
          </p>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">2. Arten der erhobenen Daten</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Freiwillig bereitgestellte Daten:</strong> Name, Vorname, E-Mail, Telefonnummer, Kreditkartendaten (über Krossbooking), Sonderwünsche.</li>
            <li><strong>Navigationsdaten:</strong> anonymisierte IP, Browsertyp, besuchte Seiten.</li>
            <li><strong>Cookies:</strong> nur technische Cookies für Krossbooking – siehe Cookie-Richtlinie.</li>
          </ul>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">3. Zwecke und Rechtsgrundlagen</h2>
          
          <h3 className="text-xl font-bold text-primary mt-6 mb-2">Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO):</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Buchungs- und Aufenthaltsverwaltung</li>
            <li>Buchungsbezogene Kommunikation</li>
          </ul>

          <h3 className="text-xl font-bold text-primary mt-6 mb-2">Rechtliche Verpflichtungen (Art. 6 Abs. 1 lit. c DSGVO):</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Meldung der Gästedaten an die Polizeibehörden (Art. 109 R.D. 773/1931)</li>
            <li>Steuerliche und buchhalterische Pflichten (10 Jahre Aufbewahrung)</li>
          </ul>

          <h3 className="text-xl font-bold text-primary mt-6 mb-2">Einwilligung (Art. 6 Abs. 1 lit. a DSGVO):</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Newsletter und Werbekommunikation</li>
            <li>Speicherung von Präferenzen für zukünftige Buchungen</li>
          </ul>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">4. Datenempfänger</h2>
          <p>Krossbooking, Polizeibehörden, Gemeinde, ISTAT, Region, Steuer-/Rechtsberater, Justizbehörden.</p>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">5. Aufbewahrungsfristen</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Steuerdaten: 10 Jahre</li>
            <li>Meldebelege Polizei: 5 Jahre</li>
            <li>Marketing: bis zum Widerruf der Einwilligung (max. 24 Monate)</li>
          </ul>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">6. Rechte der betroffenen Person (Art. 15-22 DSGVO)</h2>
          <p>Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit, Widerspruch, Widerruf der Einwilligung, Beschwerde bei der Aufsichtsbehörde (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary transition-colors">https://www.garanteprivacy.it</a>).</p>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">7. Kontakt</h2>
          <p>E-Mail: <a href="mailto:welcome@marinalirooms.com" className="underline hover:text-primary transition-colors">welcome@marinalirooms.com</a></p>
        </div>
      }
    />
  );
}
