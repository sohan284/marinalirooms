'use client';

import PolicyPage from '@/components/common/PolicyPage';

export default function CookiePolicyEN() {
  return (
    <PolicyPage
      title="Cookie Policy"
      content={
        <div className="space-y-6 text-left">
          <p className="text-sm opacity-60 italic">Last updated: April 2026</p>
          
          <p>This website uses only technical cookies strictly necessary for the Krossbooking booking widget to function properly.</p>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">Which cookies do we use?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Session cookies:</strong> keep your booking active while you navigate the site.</li>
            <li><strong>Preference cookies:</strong> remember your selected language and currency during the booking process.</li>
          </ul>

          <p className="mt-6">No profiling, marketing or tracking cookies are used by our site or the Krossbooking widget.</p>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">How to manage or disable cookies</h2>
          <p>You can control, limit or delete cookies through your browser settings (Chrome, Firefox, Safari, Edge, etc.).</p>
          <p className="font-semibold italic text-primary mt-4">Please note: disabling technical cookies may break the room booking form.</p>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">Third-party data processing</h2>
          <p>Bookings are handled by Krossbooking. For information on how your personal data is processed, please read Krossbooking's official privacy policy: <a href="https://www.krossbooking.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary transition-colors">https://www.krossbooking.com/privacy</a></p>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">Changes to this Cookie Policy</h2>
          <p>Any updates will be posted on this page. We recommend checking it occasionally.</p>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">Contact</h2>
          <p>For questions about cookies or data processing: <a href="mailto:welcome@marinalirooms.com" className="underline hover:text-primary transition-colors">welcome@marinalirooms.com</a></p>
        </div>
      }
    />
  );
}
