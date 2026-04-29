'use client';

import PolicyPage from '@/components/common/PolicyPage';

export default function PrivacyPolicyIT() {
  return (
    <PolicyPage
      title="Privacy Policy"
      content={

        <div className="space-y-6 text-left">
          <p className="text-sm opacity-60 italic">Ultimo aggiornamento: Aprile 2026</p>
          
          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">1. Titolare del trattamento</h2>
          <p>
            <strong>Marinali Rooms</strong><br />
            Indirizzo: Via O. Marinali, 13 - 36061 Bassano del Grappa (Italy)<br />
            Email: <a href="mailto:welcome@marinalirooms.com" className="underline hover:text-primary transition-colors">welcome@marinalirooms.com</a>
          </p>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">2. Tipologie di dati raccolti</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Dati forniti volontariamente:</strong> nome, cognome, email, telefono, dati carta di credito (tramite Krossbooking), richieste speciali.</li>
            <li><strong>Dati di navigazione:</strong> IP anonimizzato, browser, pagine visitate.</li>
            <li><strong>Cookie:</strong> solo cookie tecnici Krossbooking – vedi Cookie Policy.</li>
          </ul>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">3. Finalità e base giuridica</h2>
          
          <h3 className="text-xl font-bold text-primary mt-6 mb-2">Esecuzione del contratto (Art. 6 par. 1 lett. b GDPR):</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Gestione prenotazioni e soggiorni</li>
            <li>Comunicazioni relative alla prenotazione</li>
          </ul>

          <h3 className="text-xl font-bold text-primary mt-6 mb-2">Obblighi legali (Art. 6 par. 1 lett. c GDPR):</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Comunicazione dati alla Questura (art. 109 R.D. 773/1931)</li>
            <li>Adempimenti fiscali e contabili (10 anni)</li>
          </ul>

          <h3 className="text-xl font-bold text-primary mt-6 mb-2">Consenso (Art. 6 par. 1 lett. a GDPR):</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Newsletter e comunicazioni commerciali</li>
            <li>Salvataggio preferenze per future prenotazioni</li>
          </ul>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">4. Destinatari dei dati</h2>
          <p>Krossbooking, Questura, Comune, ISTAT, Regione, consulenti commercialisti/fiscali, autorità giudiziarie.</p>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">5. Periodo di conservazione</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Dati fiscali: 10 anni</li>
            <li>Ricevute Alloggiati Web: 5 anni</li>
            <li>Marketing: fino a revoca consenso (max 24 months)</li>
          </ul>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">6. Diritti dell'interessato (Artt. 15-22 GDPR)</h2>
          <p>Accesso, rettifica, cancellazione, limitazione, portabilità, opposizione, revoca consenso, reclamo al Garante Privacy (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary transition-colors">https://www.garanteprivacy.it</a>).</p>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">7. Contatti</h2>
          <p>Email: <a href="mailto:welcome@marinalirooms.com" className="underline hover:text-primary transition-colors">welcome@marinalirooms.com</a></p>
        </div>
      }
    />
  );
}
