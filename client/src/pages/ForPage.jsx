import { Link, useParams } from 'react-router-dom'
import { usePageMeta } from '../hooks/useCanonical'

const APP_URL = 'https://get-fimi.com'

const INDUSTRIES = {
  restaurants: {
    name: 'Restaurants',
    headline: 'Collect restaurant reviews that fill tables',
    subheadline: 'Turn happy diners into your best marketing. Display glowing reviews on your site — and handle complaints before they hit TripAdvisor.',
    pain: [
      'A single bad review on TripAdvisor or Google can cost you dozens of bookings',
      'Happy customers rarely leave reviews unprompted — they need a nudge',
      'You have no way to respond to negative feedback privately before it goes public',
      'Your menu page has no social proof — visitors leave without booking',
    ],
    how: [
      'Place a QR code on every table and receipt — customers scan and review in 30 seconds',
      'Happy diners (3+ stars) are prompted to also share on Google — bad reviews stay private',
      'Embed your best reviews directly on your website and booking page',
      'Get notified of every review instantly and manage everything from one dashboard',
    ],
    quote: '"We put the QR code on our receipts. Within a week we had 40 reviews on our site and our Google rating went up half a star."',
    quoteAuthor: 'Restaurant owner, Athens',
    cta: 'Start collecting restaurant reviews',
  },
  agencies: {
    name: 'Marketing Agencies',
    headline: 'Client testimonials that win new retainers',
    subheadline: 'Prospects check your case studies before they sign. Give them a polished Wall of Love that converts — without chasing clients for quotes.',
    pain: [
      'Asking clients for testimonials feels awkward — most never get around to it',
      'Good feedback lives in emails and Slack, not where prospects can see it',
      'Negative feedback from difficult clients could damage your reputation publicly',
      'You spend hours manually updating your website\'s "what clients say" section',
    ],
    how: [
      'Send every client a review link at project completion — automated, no chasing',
      'Embed an always-updated testimonials section on your agency website with one script tag',
      'Sensitive feedback stays private so you can address it without public embarrassment',
      'White-label the experience — your branding, not Fimi\'s',
    ],
    quote: '"We embedded the widget on our case studies page. Three clients mentioned they signed because of the testimonials they saw there."',
    quoteAuthor: 'Agency founder, London',
    cta: 'Start collecting client testimonials',
  },
  freelancers: {
    name: 'Freelancers',
    headline: 'Build the social proof that gets you hired',
    subheadline: 'Clients Google you before they reach out. A Wall of Love full of real client reviews is the most convincing portfolio page you can have.',
    pain: [
      'You have happy clients but no structured way to show their feedback to prospects',
      'Your portfolio shows your work — but not what it\'s like to work with you',
      'One unhappy client leaving a public review could disproportionately hurt you',
      'Chasing former clients for testimonials is time-consuming and feels unprofessional',
    ],
    how: [
      'Send every client a review link at project wrap-up — one click, no sign-up needed for them',
      'Build a shareable Wall of Love page you can link in your bio and proposals',
      'Negative feedback stays private — you get to address it first',
      'Embed your testimonials on your personal website automatically',
    ],
    quote: '"I linked my Wall of Love in my Upwork bio. My conversion rate from profile visit to hire went up noticeably."',
    quoteAuthor: 'Freelance web developer',
    cta: 'Build your freelancer Wall of Love',
  },
  coaches: {
    name: 'Coaches & Consultants',
    headline: 'Turn client transformations into your best sales tool',
    subheadline: 'People buy coaching based on results and trust. Collect powerful testimonials that show transformation — and display them where prospects are deciding.',
    pain: [
      'Your best clients get amazing results but you never capture their words in a usable format',
      'Testimonials on your site look outdated and unstructured',
      'A bad review from a wrong-fit client could undermine your positioning',
      'You\'re manually collecting and formatting testimonials one by one',
    ],
    how: [
      'Send a review link at the end of every engagement — clients submit in 30 seconds',
      'Display testimonials on your sales page and booking site automatically',
      'Private feedback helps you improve without damaging your reputation',
      'AI summary of all reviews gives you marketing copy in seconds',
    ],
    quote: '"I used the AI summary feature to write my homepage headline. It captured exactly what clients value about working with me."',
    quoteAuthor: 'Business coach',
    cta: 'Start building your coaching testimonials',
  },
  dentists: {
    name: 'Dental Practices',
    headline: 'More 5-star reviews. Fewer surprises on Google.',
    subheadline: 'Patients search for dentists online before booking. A strong review profile wins new patients — but one angry review can cost you many more.',
    pain: [
      'Anxious patients who had a bad experience are far more likely to leave public reviews',
      'Happy patients don\'t think to leave reviews unless you specifically ask them',
      'You have no way to intercept negative feedback before it goes on Google',
      'Managing reviews across Google, Facebook, and your website is time-consuming',
    ],
    how: [
      'Send patients a review link after their appointment via email or SMS',
      'Happy patients get directed to Google for maximum public visibility',
      'Unhappy patients submit privately — you address their concern before any public post',
      'Your best reviews automatically appear on your practice website',
    ],
    quote: '"We went from 3.8 to 4.6 stars on Google in 3 months. The private feedback filter changed everything."',
    quoteAuthor: 'Dental practice manager',
    cta: 'Start collecting patient reviews',
  },
  gyms: {
    name: 'Gyms & Fitness Studios',
    headline: 'Member success stories that sell memberships for you',
    subheadline: 'Nothing converts a gym prospect faster than real transformations from real members. Collect them automatically and display them where new people are deciding.',
    pain: [
      'You have members getting great results but their stories never get shared',
      'Prospects visit your website and leave because there\'s no social proof',
      'Cancellations sometimes come with angry public reviews that scare off new sign-ups',
      'Collecting testimonials manually is inconsistent and time-consuming',
    ],
    how: [
      'Send members a review link at their 30-day and 90-day milestones',
      'Embed a live testimonials wall on your website and sign-up page',
      'Complaints and cancellation feedback stays private for you to address',
      'QR codes at your front desk capture reviews while the experience is fresh',
    ],
    quote: '"We added the embed widget to our pricing page. Trial sign-ups increased — people saw real member reviews right there."',
    quoteAuthor: 'Gym owner',
    cta: 'Start collecting member testimonials',
  },
  salons: {
    name: 'Hair Salons & Beauty Studios',
    headline: 'Reviews that bring clients back — and bring new ones in',
    subheadline: 'Beauty is visual, but trust comes from other people\'s words. Collect genuine client reviews and display them where new clients are searching for their next appointment.',
    pain: [
      'Clients love their results in the chair but rarely think to leave a review after',
      'One difficult client leaving a bad review can undo months of 5-star service',
      'Your Instagram looks amazing but your website has no testimonials',
      'Managing Google reviews, Facebook, and your site separately takes too much time',
    ],
    how: [
      'Send every client a review link right after their appointment — via text or email',
      'Unhappy clients submit feedback privately so you can make it right before they go public',
      'Display your best reviews on your booking page — right where the decision is made',
      'QR code cards on your reception desk capture walk-in clients too',
    ],
    quote: '"I send the review link in my post-appointment follow-up text. It\'s become part of my routine and my Google reviews have tripled."',
    quoteAuthor: 'Hair stylist & salon owner',
    cta: 'Start collecting salon reviews',
  },
  ecommerce: {
    name: 'eCommerce Stores',
    headline: 'Product reviews that increase conversions, not anxiety',
    subheadline: 'Shoppers read reviews before buying. Collect post-purchase testimonials automatically and embed them where they have the most impact.',
    pain: [
      'Your product pages have no reviews — shoppers leave without converting',
      'Returns and complaints can turn into damaging public reviews',
      'You rely on platform reviews (Etsy, Amazon) instead of owning your social proof',
      'Collecting and displaying reviews manually is a constant time drain',
    ],
    how: [
      'Send automated review requests after every purchase confirmation',
      'Disappointed customers submit feedback privately — you can resolve it before it escalates',
      'Embed a product testimonials widget directly on your store',
      'Own your reviews independent of any marketplace platform',
    ],
    quote: '"Added the widget below the product description. Our add-to-cart rate improved within the first week."',
    quoteAuthor: 'Shopify store owner',
    cta: 'Start collecting product reviews',
  },
  lawyers: {
    name: 'Law Firms',
    headline: 'Client testimonials that build trust before the first call',
    subheadline: 'People choosing a lawyer are making one of the most important decisions of their lives. Genuine client testimonials reduce doubt and increase consultation bookings.',
    pain: [
      'Legal services are high-stakes — prospects need social proof before picking up the phone',
      'Bar association rules limit traditional advertising — testimonials are one of the few tools you have',
      'Unhappy clients can leave public reviews that are disproportionately damaging for a firm\'s reputation',
      'You have satisfied clients but no systematic way to capture their positive experiences',
    ],
    how: [
      'Send a review link at case resolution — when client satisfaction is at its peak',
      'Private feedback lets you address concerns before they become public complaints',
      'Your testimonials page builds credibility for prospects doing research before calling',
      'Embed your reviews on your practice area pages where decisions are made',
    ],
    quote: '"We added testimonials to our family law page. Consultation requests from that page increased significantly."',
    quoteAuthor: 'Family law solicitor',
    cta: 'Start collecting client testimonials',
  },
  hotels: {
    name: 'Hotels & Guesthouses',
    headline: 'More direct bookings. Fewer surprises on Booking.com.',
    subheadline: 'Travellers check reviews before booking. Give them glowing guest testimonials on your direct booking site — and handle complaints before they go on OTA platforms.',
    pain: [
      'Negative reviews on Booking.com or TripAdvisor directly reduce your ranking and revenue',
      'Happy guests rarely leave reviews spontaneously — they need a prompt',
      'OTA platforms own your guest reviews — you have no control or portability',
      'You have no channel to collect private feedback before it becomes a public complaint',
    ],
    how: [
      'Send guests a review request at checkout — automatically captures their experience at peak satisfaction',
      'Unhappy guests submit privately — you resolve their issue before they post anywhere publicly',
      'Embed guest testimonials on your direct booking website to reduce OTA dependency',
      'Own your reviews independently from any platform',
    ],
    quote: '"We send the link in our checkout email. Private complaints let us fix issues same-day — our public review score has improved noticeably."',
    quoteAuthor: 'Boutique hotel manager',
    cta: 'Start collecting guest testimonials',
  },
  photographers: {
    name: 'Photographers',
    headline: 'Client testimonials that book more shoots',
    subheadline: 'People book photographers based on portfolio AND personality. Real client reviews show what it\'s like to work with you — not just what your photos look like.',
    pain: [
      'Your portfolio shows the work but not the experience — prospects can\'t differentiate you',
      'Happy couples and clients forget to leave reviews after the excitement wears off',
      'One unhappy client leaving a public review can overshadow dozens of happy ones',
      'There\'s no professional way to display testimonials alongside your portfolio',
    ],
    how: [
      'Send a review link 1-2 weeks after delivery when clients are most excited',
      'Build a Wall of Love that you can link in your bio, proposals, and email signature',
      'Private feedback lets you address issues without public drama',
      'Embed your testimonials on your portfolio site next to your galleries',
    ],
    quote: '"I link my Wall of Love in every inquiry response. Couples can immediately see what other couples say about working with me."',
    quoteAuthor: 'Wedding photographer',
    cta: 'Build your photography testimonials wall',
  },
  tutors: {
    name: 'Tutors & Online Educators',
    headline: 'Student success stories that fill your calendar',
    subheadline: 'Parents and students want proof that your teaching works. A wall of real student outcomes is more convincing than any course description.',
    pain: [
      'Prospective students have no way to verify your results beyond your own claims',
      'Good feedback comes in WhatsApp messages — not in a format you can show prospects',
      'Negative reviews from difficult students can unfairly damage your reputation',
      'You spend time building trust in every intro call instead of converting from your website',
    ],
    how: [
      'Send a review request at the end of each module or term',
      'Display student success stories on your booking page and course landing page',
      'Negative feedback is private — address it with the student directly',
      'AI-generated summary of all reviews gives you instant marketing copy',
    ],
    quote: '"I added my testimonial wall to my tutor profile and website. Parents contact me already convinced — the sales conversation is much shorter."',
    quoteAuthor: 'Online maths tutor',
    cta: 'Start collecting student testimonials',
  },
  'real-estate': {
    name: 'Real Estate Agents',
    headline: 'Client testimonials that win more listings',
    subheadline: 'Sellers and buyers choose their agent based on trust and track record. Real client testimonials are the most powerful proof you can show — more than any badge or award.',
    pain: [
      'Every listing presentation is a competition — you need proof of results to stand out',
      'Happy clients forget to leave reviews after the stress of moving subsides',
      'A single unhappy buyer can leave a public review that casts doubt on your whole career',
      'Testimonials are scattered across Rightmove, Google, and old emails',
    ],
    how: [
      'Send a review link at completion — when client satisfaction is at its highest',
      'Build a Wall of Love that you can print in listing packs and link from your profile',
      'Private complaints let you resolve issues without public damage',
      'Embed testimonials on your personal agent page to convert more enquiries',
    ],
    quote: '"I include my Wall of Love link in every listing presentation. Vendors say the testimonials were a key reason they chose me."',
    quoteAuthor: 'Independent estate agent',
    cta: 'Start collecting client testimonials',
  },
  accountants: {
    name: 'Accountants & Bookkeepers',
    headline: 'Build trust before the discovery call',
    subheadline: 'Small business owners choosing an accountant need to trust you with their finances. Genuine client testimonials reduce uncertainty and increase conversion from website to call.',
    pain: [
      'Accounting is a trust-based service — prospects need social proof before reaching out',
      'Happy clients don\'t think to leave reviews because everything just "works"',
      'An unhappy client can leave a damaging public review that is hard to respond to professionally',
      'You rely entirely on referrals with no scalable way to show prospects your track record',
    ],
    how: [
      'Send a review request after year-end accounts — your highest-satisfaction moment',
      'Private feedback lets you address any concerns before they become public',
      'Display testimonials on your services page to convert more website visitors',
      'Build a Wall of Love to share on LinkedIn and in your email signature',
    ],
    quote: '"I added the testimonial embed to my \"services\" page. The number of qualified enquiries I get has gone up — people arrive already trusting me."',
    quoteAuthor: 'Freelance accountant',
    cta: 'Start collecting client testimonials',
  },
  'personal-trainers': {
    name: 'Personal Trainers',
    headline: 'Client transformations that sell your training',
    subheadline: 'Before-and-after photos get attention. But real client words about what it\'s like to train with you is what converts prospects into paying clients.',
    pain: [
      'You have clients getting incredible results but you\'re not capturing their stories',
      'Prospects see your Instagram but can\'t hear from other clients',
      'A difficult client leaving a public review can hurt your local reputation',
      'There\'s no professional home for your testimonials outside of social media',
    ],
    how: [
      'Send a review request at the 30-day and 90-day milestones — when results are visible',
      'Build a Wall of Love you can link in your Instagram bio and consultation follow-ups',
      'Private feedback helps you improve your programming without public criticism',
      'Embed testimonials on your PT website or booking page',
    ],
    quote: '"My Wall of Love link in my bio converts better than any ad I\'ve run. People read the reviews and DM me ready to start."',
    quoteAuthor: 'Independent personal trainer',
    cta: 'Start collecting PT client testimonials',
  },
  startups: {
    name: 'Startups & SaaS',
    headline: 'Customer proof that closes enterprise deals',
    subheadline: 'Logos and case studies help — but real user testimonials on your pricing page is what pushes enterprise buyers to book a demo.',
    pain: [
      'You\'re asking prospects to trust a young product with no track record',
      'Your G2 or Capterra reviews take months to accumulate',
      'Churned users can leave damaging public reviews that hurt your conversion',
      'Happy users give you great feedback in Slack but it never makes it to your website',
    ],
    how: [
      'Collect testimonials directly from happy users in-app or via email at activation',
      'Embed a live testimonial widget on your pricing page and homepage',
      'Private feedback from churned users helps you improve without reputation damage',
      'AI summary generates "what customers say" marketing copy automatically',
    ],
    quote: '"We added the widget to our pricing page during our public beta. It made the page feel much more credible even with only 20 users."',
    quoteAuthor: 'SaaS founder',
    cta: 'Start collecting user testimonials',
  },
}

const CHECK = () => (
  <svg className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
)

const X_ICON = () => (
  <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
)

export default function ForPage() {
  const { industry } = useParams()
  const data = INDUSTRIES[industry]
  usePageMeta({
    path: `/for/${industry}`,
    title: data ? `Fimi for ${data.name} — Collect & Display Customer Reviews` : 'Fimi for Your Business',
    description: data ? data.subheadline : undefined,
  })

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-gray-400 text-sm">
        Page not found. <Link to="/" className="ml-2 text-indigo-400 hover:underline">Back to Fimi →</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Nav */}
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between max-w-5xl mx-auto">
        <Link to="/" className="font-bold text-lg tracking-tight">
          Fimi <span className="text-xs text-gray-500 font-normal ml-1">φήμη · /ˈfi.mi/ · reputation</span>
        </Link>
        <Link
          to="/register"
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
        >
          Try free →
        </Link>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 space-y-14">
        {/* Hero */}
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 text-xs text-indigo-400 bg-indigo-900/30 border border-indigo-800 rounded-full px-3 py-1">
            Fimi for {data.name}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">{data.headline}</h1>
          <p className="text-gray-400 text-lg leading-relaxed">{data.subheadline}</p>
          <Link
            to="/register"
            className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-7 py-3.5 rounded-xl text-base transition"
          >
            {data.cta} →
          </Link>
        </div>

        {/* Pain points */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">The problem with reviews right now</h2>
          <ul className="space-y-3">
            {data.pain.map((item) => (
              <li key={item} className="flex items-start gap-3 text-gray-300">
                <X_ICON />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* How Fimi helps */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">How Fimi fixes it</h2>
          <ul className="space-y-3">
            {data.how.map((item) => (
              <li key={item} className="flex items-start gap-3 text-gray-200">
                <CHECK />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Quote */}
        <blockquote className="bg-gray-900 border-l-4 border-indigo-500 rounded-r-xl px-6 py-5 space-y-2">
          <p className="text-gray-200 italic leading-relaxed">{data.quote}</p>
          <cite className="text-sm text-gray-500 not-italic">— {data.quoteAuthor}</cite>
        </blockquote>

        {/* Feature highlights */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Everything you need in one place</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              'Collection page — no app needed for customers',
              'Private negative review filtering',
              'Embeddable widget for your website',
              'Wall of Love public testimonials page',
              'QR code for offline collection',
              'AI reply suggestions for private feedback',
              'Email review request tool',
              'WhatsApp sharing with one click',
              'AI summary for marketing copy',
              'Free plan — no credit card required',
            ].map((f) => (
              <div key={f} className="flex items-start gap-2 text-sm text-gray-300 bg-gray-900 rounded-lg px-3 py-2.5">
                <CHECK />
                {f}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-indigo-900/20 border border-indigo-700 rounded-2xl p-8 text-center space-y-4">
          <h2 className="text-2xl font-bold">Start collecting {data.name.toLowerCase()} reviews today</h2>
          <p className="text-gray-400">Free plan available. Setup takes under 5 minutes.</p>
          <Link
            to="/register"
            className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-3.5 rounded-xl text-base transition"
          >
            {data.cta} →
          </Link>
        </div>

        {/* Other industries */}
        <div className="border-t border-gray-800 pt-8">
          <p className="text-xs text-gray-500 mb-3 uppercase tracking-wide">Fimi for other industries</p>
          <div className="flex flex-wrap gap-3">
            {Object.entries(INDUSTRIES)
              .filter(([slug]) => slug !== industry)
              .map(([slug, d]) => (
                <Link
                  key={slug}
                  to={`/for/${slug}`}
                  className="text-sm text-indigo-400 hover:text-indigo-300 underline"
                >
                  {d.name}
                </Link>
              ))}
          </div>
        </div>
      </main>
    </div>
  )
}
