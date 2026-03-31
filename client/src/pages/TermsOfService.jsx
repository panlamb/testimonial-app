import { Link } from 'react-router-dom'

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-8 my-8">
        <Link to="/" className="text-sm text-indigo-600 hover:underline mb-6 block">
          ← Back to home
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-400 mb-8">Last updated: 1 April 2026</p>

        <div className="prose prose-sm text-gray-700 space-y-6">
          <section>
            <h2 className="font-semibold text-gray-900 text-base mb-2">1. Acceptance of Terms</h2>
            <p>By creating an account or using Fimi ("the Service"), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 text-base mb-2">2. Description of Service</h2>
            <p>Fimi is a testimonial collection and display platform. It allows businesses to collect reviews from their customers, moderate them, and display them publicly via embeddable widgets and dedicated pages.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 text-base mb-2">3. Accounts</h2>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>You must provide accurate information when registering.</li>
              <li>You are responsible for maintaining the security of your account and password.</li>
              <li>You must be at least 18 years old to create an account.</li>
              <li>One account per business. Multiple accounts for the same business are not permitted on Free or Pro plans.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 text-base mb-2">4. Acceptable Use</h2>
            <p>You agree not to use Fimi to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Publish false, misleading, or fabricated reviews.</li>
              <li>Harass, threaten, or defame any individual or business.</li>
              <li>Collect reviews without the knowledge or consent of the reviewers.</li>
              <li>Violate any applicable law or regulation.</li>
              <li>Attempt to reverse-engineer, scrape, or disrupt the Service.</li>
            </ul>
            <p className="mt-2">We reserve the right to suspend or terminate accounts that violate these terms without prior notice.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 text-base mb-2">5. Content</h2>
            <p>You are solely responsible for the reviews collected through your account and any content displayed on your collection page or Wall of Love. Fimi does not verify the accuracy of user-submitted reviews and accepts no liability for their content.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 text-base mb-2">6. Plans, Trials & Billing</h2>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Fimi offers a Free plan and paid plans (Pro, Agency).</li>
              <li>All paid plans include a 30-day free trial. No credit card is required to start a trial.</li>
              <li>Paid plans are billed monthly. Prices are listed on the Pricing page and may change with 30 days' notice.</li>
              <li>You may cancel your plan at any time. No refunds are issued for partial billing periods.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 text-base mb-2">7. Limitation of Liability</h2>
            <p>Fimi is provided "as is" without warranties of any kind. To the fullest extent permitted by law, Fimi shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Service.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 text-base mb-2">8. Termination</h2>
            <p>We may suspend or terminate your account at any time if you violate these Terms. You may also delete your account at any time by contacting us. Upon termination, your data will be deleted within 30 days.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 text-base mb-2">9. Changes to Terms</h2>
            <p>We may update these Terms from time to time. We will notify registered users by email at least 14 days before significant changes take effect. Continued use of the Service after changes constitutes acceptance.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 text-base mb-2">10. Contact</h2>
            <p>
              For questions about these Terms, contact us at{' '}
              <a href="mailto:panos.lambrakis@gmail.com" className="text-indigo-600 hover:underline">
                panos.lambrakis@gmail.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
