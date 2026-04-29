'use client';

import PolicyPage from '@/components/common/PolicyPage';

export default function CookiePolicyDE() {
  return (
    <PolicyPage
      title="Cookie-Richtlinie"
      content={
        <div className="space-y-6 text-left">
          <p className="text-sm opacity-60 italic">Letzte Aktualisierung: April 2026</p>
          
          <p>Diese Website verwendet ausschließlich technisch notwendige Cookies für das Krossbooking-Buchungs-Widget.</p>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">Welche Cookies werden verwendet?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Sitzungs-Cookies:</strong> halten die Buchung aktiv, während Sie auf der Website navigieren.</li>
            <li><strong>Präferenz-Cookies:</strong> speichern Ihre ausgewählte Sprache und Währung während des Buchungsvorgangs.</li>
          </ul>

          <p className="mt-6">Es werden keine Profiling-, Marketing- oder Tracking-Cookies von unserer Website oder dem Krossbooking-Widget verwendet.</p>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">Cookies verwalten oder deaktivieren</h2>
          <p>Sie können Cookies in den Einstellungen Ihres Browsers kontrollieren, einschränken oder löschen (Chrome, Firefox, Safari, Edge usw.).</p>
          <p className="font-semibold italic text-primary mt-4">Wichtig: Wenn Sie technische Cookies deaktivieren, funktioniert das Buchungsformular möglicherweise nicht richtig.</p>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">Datenverarbeitung durch Dritte</h2>
          <p>Buchungen werden über Krossbooking abgewickelt. Informationen zur Verarbeitung Ihrer personenbezogenen Daten finden Sie in der offiziellen Datenschutzerklärung von Krossbooking: <a href="https://www.krossbooking.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary transition-colors">https://www.krossbooking.com/privacy</a></p>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">Änderungen dieser Cookie-Richtlinie</h2>
          <p>Alle Aktualisierungen werden auf dieser Seite veröffentlicht. Bitte schauen Sie gelegentlich vorbei.</p>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">Kontakt</h2>
          <p>Bei Fragen zu Cookies oder zur Datenverarbeitung: <a href="mailto:welcome@marinalirooms.com" className="underline hover:text-primary transition-colors">welcome@marinalirooms.com</a></p>
        </div>
      }
    />
  );
}
