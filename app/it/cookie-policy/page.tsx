'use client';

import PolicyPage from '@/components/common/PolicyPage';

export default function CookiePolicyIT() {
  return (
    <PolicyPage
      title="Cookie Policy"
      content={

        <div className="space-y-6 text-left">
          <p className="text-sm opacity-60 italic">Ultimo aggiornamento: Aprile 2026</p>
          
          <p>Questo sito web utilizza esclusivamente cookie tecnici necessari al funzionamento del widget di prenotazione Krossbooking.</p>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">Quali cookie vengono utilizzati?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Cookie di sessione:</strong> mantengono attiva la prenotazione mentre navighi tra le pagine.</li>
            <li><strong>Cookie di preferenza:</strong> ricordano la lingua e la valuta selezionate durante il processo di prenotazione.</li>
          </ul>

          <p className="mt-6">Nessun cookie di profilazione, marketing o tracciamento viene utilizzato dal nostro sito o dal widget Krossbooking.</p>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">Come gestire o disabilitare i cookie</h2>
          <p>Puoi controllare, limitare o cancellare i cookie direttamente dalle impostazioni del tuo browser (Chrome, Firefox, Safari, Edge, ecc.).</p>
          <p className="font-semibold italic text-primary mt-4">Attenzione: la disabilitazione dei cookie tecnici potrebbe impedire il corretto funzionamento del modulo di prenotazione delle camere.</p>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">Dati e servizi di terze parti</h2>
          <p>Le prenotazioni sono gestite tramite la piattaforma Krossbooking. Per informazioni sul trattamento dei tuoi dati personali, consulta la privacy policy ufficiale di Krossbooking: <a href="https://www.krossbooking.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary transition-colors">https://www.krossbooking.com/privacy</a></p>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">Modifiche alla presente Cookie Policy</h2>
          <p>Eventuali aggiornamenti verranno pubblicati su questa stessa pagina. Ti invitiamo a consultarla periodicamente.</p>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">Contatti</h2>
          <p>Per domande relative all'uso dei cookie o al trattamento dei tuoi dati: <a href="mailto:welcome@marinalirooms.com" className="underline hover:text-primary transition-colors">welcome@marinalirooms.com</a></p>
        </div>
      }
    />
  );
}
