'use client';

import PolicyPage from '@/components/common/PolicyPage';

export default function PrivacyPolicyEN() {
  return (
    <PolicyPage
      title="Privacy Policy"
      content={

        <div className="space-y-6 text-left">
          <p className="text-sm opacity-60 italic">Last updated: April 2026</p>
          
          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">1. Data Controller</h2>
          <p>
            <strong>Marinali Rooms</strong><br />
            Address: Via O. Marinali, 13 - 36061 Bassano del Grappa (Italy)<br />
            Email: <a href="mailto:welcome@marinalirooms.com" className="underline hover:text-primary transition-colors">welcome@marinalirooms.com</a>
          </p>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">2. Types of Data Collected</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Data provided voluntarily:</strong> name, surname, email, phone number, credit card details (via Krossbooking), special requests.</li>
            <li><strong>Browsing data:</strong> anonymized IP, browser type, pages visited.</li>
            <li><strong>Cookies:</strong> only technical cookies for Krossbooking – see Cookie Policy.</li>
          </ul>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">3. Purposes and Legal Basis</h2>
          
          <h3 className="text-xl font-bold text-primary mt-6 mb-2">Contract execution (Art. 6(1)(b) GDPR):</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Booking and stay management</li>
            <li>Booking-related communications</li>
          </ul>

          <h3 className="text-xl font-bold text-primary mt-6 mb-2">Legal obligations (Art. 6(1)(c) GDPR):</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Guest data communication to Police Headquarters (art. 109 R.D. 773/1931)</li>
            <li>Tax and accounting obligations (10 years retention)</li>
          </ul>

          <h3 className="text-xl font-bold text-primary mt-6 mb-2">Consent (Art. 6(1)(a) GDPR):</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Newsletters and marketing communications</li>
            <li>Saving preferences for future bookings</li>
          </ul>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">4. Data Recipients</h2>
          <p>Krossbooking, Police Headquarters, Municipality, ISTAT, Region, tax/legal consultants, judicial authorities.</p>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">5. Retention Periods</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Tax data: 10 years</li>
            <li>Police reporting receipts: 5 years</li>
            <li>Marketing: until consent withdrawal (max 24 months)</li>
          </ul>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">6. Data Subject Rights (Arts. 15-22 GDPR)</h2>
          <p>Access, rectification, erasure, restriction, data portability, objection, withdraw consent, lodge a complaint with the supervisory authority (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary transition-colors">https://www.garanteprivacy.it</a>).</p>

          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">7. Contact</h2>
          <p>Email: <a href="mailto:welcome@marinalirooms.com" className="underline hover:text-primary transition-colors">welcome@marinalirooms.com</a></p>
        </div>
      }
    />
  );
}
