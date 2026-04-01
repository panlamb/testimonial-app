import { Link, useParams } from 'react-router-dom'
import { usePageMeta } from '../hooks/useCanonical'

export const POSTS = [
  {
    slug: 'how-to-collect-customer-testimonials',
    title: 'How to Collect Customer Testimonials That Actually Convert',
    excerpt: 'Most businesses have happy customers and almost no testimonials. Here\'s the systematic approach that fixes that — without awkward chasing.',
    category: 'Growth',
    date: 'March 2025',
    readTime: '5 min',
    content: `
## The problem: happy customers, no testimonials

Your customers are satisfied. Some are genuinely delighted. But if you check your website right now, there's a good chance the testimonials section is either empty, outdated, or has two generic quotes from 2021.

This isn't because your customers don't want to help. It's because you've never made it easy for them.

---

## Why most testimonial collection fails

The typical approach goes like this: a customer finishes a project or makes a purchase, you think "I should ask for a testimonial," you draft an awkward email three weeks later, they mean to reply, and they never do.

The problems:
- **Timing is wrong.** You're asking weeks after the peak of their satisfaction.
- **The ask is too vague.** "Can you write a testimonial?" requires them to think from scratch.
- **The friction is too high.** They'd need to compose something, email it, and you'd still need to format it.

---

## What actually works

**1. Strike while the iron is hot**

Ask for a review at the moment of highest satisfaction: right after delivery, at completion, after a measurable result. The longer you wait, the more the emotional peak fades.

For service businesses: send the link the day you deliver the final product.
For restaurants: QR code on the receipt.
For SaaS: triggered email at day 7 activation.

**2. Make it one click**

Don't ask them to write an email. Give them a direct link to a simple form they can complete in 30 seconds. No login, no app, no account.

**3. Guide them with prompts**

A blank text box is the enemy. The best review forms include optional prompts:
- "What was your situation before working with us?"
- "What specific result did you get?"
- "Who would you recommend us to?"

These produce specific, convincing testimonials — not generic "great service!" responses.

**4. Ask at scale, systematically**

Build the review request into your standard workflow. At the end of every project, appointment, or purchase — a review link goes out. Make it a habit, not an afterthought.

---

## What to do with negative feedback

Here's the uncomfortable truth: if you open a review channel, some people will use it to complain.

The smart approach is private filtering: reviews below 3 stars stay private and go directly to you, while positive reviews get displayed publicly. This lets you handle unhappy customers with care — and often turn them around — before they post publicly on Google or TripAdvisor.

This is exactly what Fimi does by default.

---

## Where to display testimonials for maximum impact

Getting testimonials is only half the job. Where you put them matters enormously:

- **Homepage**: above the fold, next to your main CTA
- **Pricing page**: right next to the "buy" button — this is the highest-leverage placement
- **Service/product pages**: specific testimonials that match the page content
- **Email proposals**: a link to your Wall of Love
- **Email signature**: a link saying "What our clients say"

---

## The compounding effect

Testimonials build on themselves. Once you have 10, it's easier to get to 25. Once you have 50, your review page becomes a legitimate sales tool. Start collecting now, even if the results feel slow at first.

The businesses with the most powerful social proof aren't the ones who have been around longest — they're the ones who built the system earliest.
    `,
  },
  {
    slug: 'handle-negative-reviews',
    title: 'How to Handle Negative Reviews Before They Go Public',
    excerpt: 'One angry customer can undo months of positive reputation. Here\'s how to intercept negative feedback early — legally and ethically.',
    category: 'Reputation',
    date: 'March 2025',
    readTime: '4 min',
    content: `
## The asymmetry of reviews

Unhappy customers are far more motivated to leave reviews than happy ones. Research consistently shows that a customer who had a negative experience is 2-3x more likely to leave a public review than one who had a positive experience.

This creates a dangerous asymmetry: your public review profile will naturally drift negative over time, even if the vast majority of your customers are satisfied.

The answer isn't to suppress legitimate criticism. It's to create a private channel for unhappy customers to reach you before they reach Google.

---

## Private feedback filtering: how it works

The idea is simple. When you send customers a review link:

- Customers who rate you **3 stars and above** are thanked and encouraged to share their review publicly (on Google, on your website, etc.)
- Customers who rate you **1-2 stars** submit their feedback privately — it goes to you, not the public

This achieves two things:
1. It gives unhappy customers a direct line to you — which most of them actually prefer over writing a public review
2. It gives you the opportunity to respond, make it right, and potentially turn a detractor into a promoter

---

## What to do with private negative feedback

When you receive a private complaint, the playbook is:

**Acknowledge immediately.** Reply within 24 hours. Even just: "Thank you for letting us know — I'm really sorry this happened. Can I call you to discuss?"

**Don't get defensive.** Even if you think they're wrong. Your goal at this stage is to de-escalate, not to win an argument.

**Offer a resolution.** A refund, a redo, a credit. Whatever makes sense for your business. A resolved complaint almost never becomes a public review.

**Follow up.** Check in a week later to make sure they're satisfied with how it was handled.

---

## The ethics of it

Some people worry that private feedback filtering is dishonest — that it's gaming the system.

It's worth being clear on what this is and isn't:

**What it is:** Giving unhappy customers a direct channel to reach you privately, and directing happy customers toward public platforms.

**What it isn't:** Deleting or hiding reviews that have already been posted publicly, or preventing customers from posting wherever they want.

No one is stopping an unhappy customer from posting on Google after submitting private feedback. You're simply offering them an alternative. Most choose it because they'd rather have their problem solved than broadcast their frustration.

---

## The long-term effect

Businesses that implement private feedback systems typically see two things happen:

1. Their public review scores improve over time, because unhappy customers get a better outlet
2. Their service actually improves, because they're getting systematic feedback they were never hearing before

Negative reviews, when handled privately, are one of the most valuable pieces of business intelligence you can have. The worst thing that can happen to a business is unhappy customers who say nothing to you — and everything to their friends.

---

## How to set this up

The simplest approach is to use a tool like Fimi, which handles the filtering automatically. You get a collect page, your customers submit reviews, anything below 3 stars comes to you privately, and everything above is published.

Setup takes under 5 minutes and it's free to start.
    `,
  },
  {
    slug: 'best-testimonial-software-2025',
    title: 'Best Testimonial Software in 2025: An Honest Comparison',
    excerpt: 'Senja, Testimonial.to, Endorsal, or Fimi? We compare the top tools honestly — including their weaknesses.',
    category: 'Comparison',
    date: 'March 2025',
    readTime: '6 min',
    content: `
## What to look for in testimonial software

Before comparing tools, it helps to know what actually matters:

- **Ease of collection** — Can customers submit in under 60 seconds with no login?
- **Negative review handling** — What happens when an unhappy customer submits?
- **Display options** — Can you embed reviews on your own website?
- **Pricing** — What's the real cost for a small business?
- **Extras** — QR codes, AI tools, email requests, white-labeling?

Let's go through the main players.

---

## Testimonial.to

**Strengths:** Clean UI, video testimonials on paid plans, good embed widgets, established product with many integrations.

**Weaknesses:** No built-in negative review filtering. The pricing jumps significantly for the features you actually need. Video storage adds cost fast.

**Best for:** Teams that want video testimonials and have budget for a premium plan.

**Pricing:** Free plan is quite limited. Paid plans start around $50/month.

---

## Senja

**Strengths:** Very polished interface, lots of widget styles, good free plan, Zapier integration, solid import tools.

**Weaknesses:** No private negative review filtering. Fewer growth tools (no QR codes, no AI features on lower tiers, no built-in outreach).

**Best for:** Agencies and creators who want beautiful embeds and good design options.

**Pricing:** Free plan available. Pro plans from around $29/month.

---

## Endorsal

**Strengths:** Automation sequences for collecting reviews, good for businesses that want hands-off review collection.

**Weaknesses:** Older interface, limited free plan, no negative review filtering, fewer display options than newer competitors.

**Best for:** Businesses that want automated multi-step review request sequences.

**Pricing:** Paid plans from around $29/month.

---

## Fimi

**Strengths:** Private negative review filtering built-in (unique among tools at this price point), QR code generation, AI reply suggestions for private complaints, AI summary of all reviews for marketing copy, cold outreach tools, referral program, clean embed widget, genuinely free plan.

**Weaknesses:** Newer product, no video testimonials yet, fewer embed design variants.

**Best for:** Small businesses and solo operators who want reputation protection alongside review collection — without paying enterprise prices.

**Pricing:** Free plan available. Pro plan from £15/month.

---

## The honest verdict

If you're a creator or agency with budget who wants the best-looking embeds: **Senja or Testimonial.to**.

If you want automation sequences for hands-off collection: **Endorsal**.

If you're a small business, service provider, or local business who wants to collect reviews AND protect your reputation from negative public reviews — without a big monthly fee: **Fimi**.

The negative review filtering alone is worth it if you have any exposure to unhappy customers. Every other tool in this list treats negative reviews the same as positive ones — they all go public. Fimi is the only tool at this price level that handles this correctly.

---

## The one question to ask yourself

Before picking a tool, answer this: "What happens when an unhappy customer uses my review system?"

If your answer is "they post a 1-star review on my website," that's a problem. Choose a tool that handles this gracefully.
    `,
  },
  {
    slug: 'embed-testimonials-website',
    title: 'How to Embed Testimonials on Your Website (and Why It Matters)',
    excerpt: 'A testimonials page no one visits doesn\'t convert. Here\'s where to embed reviews for maximum impact — and how to do it in minutes.',
    category: 'How-To',
    date: 'March 2025',
    readTime: '4 min',
    content: `
## The wrong way to use testimonials

Most businesses collect testimonials and put them on a dedicated "testimonials" or "reviews" page. This page is usually linked in the footer, rarely visited, and has almost no impact on conversions.

The right way: embed testimonials where decisions are being made.

---

## The highest-impact placements

**1. Pricing page**

This is the single highest-leverage placement. When a prospect is reading your pricing and sees real customer quotes from people like them — their hesitation drops dramatically. Put 2-3 targeted testimonials directly next to your "Buy" or "Get started" button.

**2. Homepage — above the fold or just below the hero**

Your homepage hero convinces people to stay. Testimonials right below the fold keep them convinced. A rotating or static grid of 4-6 reviews works well here.

**3. Product or service pages**

Match specific testimonials to the service being described. A testimonial about your SEO service should appear on the SEO service page — not in a generic pool on a testimonials page.

**4. Landing pages and ad destinations**

If you're running ads, every landing page needs social proof. An embed widget here directly improves your conversion rate and reduces your customer acquisition cost.

**5. Checkout or booking page**

Right before someone pays or commits, last-minute doubt is at its peak. A few strong testimonials at this exact point in the journey reduce abandonment.

---

## How embed widgets work

Modern testimonial tools (including Fimi) provide a JavaScript snippet you paste into your website. It looks like this:

\`\`\`html
<script src="https://app.getfimi.com/widget/your-slug.js"></script>
\`\`\`

Once added, the widget:
- Automatically pulls your latest approved reviews
- Renders them in a styled card layout
- Updates whenever you approve new testimonials — no code changes needed
- Works on any website: WordPress, Webflow, Squarespace, custom HTML, etc.

Setup takes about 2 minutes.

---

## What makes a good testimonials embed

Not all testimonials convert equally. When choosing which reviews to display:

**Specific beats vague.** "They saved us 10 hours per week" converts better than "Great service!"

**Named beats anonymous.** Reviews with a name, photo, and company build more trust.

**Relevant beats generic.** A testimonial from someone similar to your prospect is more convincing than a testimonial from a completely different business type.

**Recent beats old.** Testimonials from the past 12 months carry more weight. Keep your collection process active so your embeds stay fresh.

---

## Measuring the impact

Once you've embedded testimonials, you can measure the effect using:

- **A/B testing**: Show the widget to 50% of visitors, hide it from the other 50%, compare conversion rates
- **Scroll depth**: Do visitors read as far as your testimonials section?
- **Heatmaps**: Are visitors interacting with the testimonials?

Even without formal testing, businesses that add well-placed testimonials consistently report higher conversion rates on the pages where they're added.

The data from Fimi users shows that businesses with the widget embedded on their pricing or booking page convert at a meaningfully higher rate than those without. The effect is largest for first-time visitors who have no prior relationship with the business.

---

## Getting started

If you don't have a testimonial collection and embed system in place:

1. Set up a free Fimi account (5 minutes)
2. Send your review link to your last 10 customers
3. Approve the good ones and copy the embed code
4. Add the embed to your homepage and pricing page

Total time: under 30 minutes. The payoff compounds every month as new reviews come in automatically.
    `,
  },
  {
    slug: 'social-proof-small-business',
    title: 'Why Social Proof Is Your Cheapest Marketing Channel',
    excerpt: 'Ads get expensive. Social proof compounds for free. Here\'s why testimonials have the best ROI of any marketing investment for small businesses.',
    category: 'Strategy',
    date: 'March 2025',
    readTime: '5 min',
    content: `
## The marketing channel most small businesses ignore

Small businesses spend thousands per month on Google Ads, Facebook campaigns, and SEO agencies. They get results — but the moment they stop spending, the results stop too.

Social proof is different. Every testimonial you collect today is still converting visitors into customers three years from now. It compounds.

---

## What the research says

- **92% of consumers** read online reviews before making a purchase decision (BrightLocal)
- **88% of consumers** trust online reviews as much as personal recommendations
- Pages with customer testimonials convert at rates **34% higher** on average than pages without
- A single increase of one star in average rating can increase revenue by **5-9%** (Harvard Business School)

These aren't marginal effects. They're large enough to meaningfully change the economics of a small business.

---

## The compounding mechanism

Here's why social proof compounds when most marketing channels don't:

**Each testimonial works 24/7.** An ad runs when you're paying for it. A testimonial on your website is there for every visitor, forever.

**More testimonials attract more testimonials.** When prospects see that 50 other people trusted you enough to leave a review, they're more likely to convert — and more likely to leave a review themselves.

**Good reviews reduce your ad costs.** If your Google Ads landing page has strong testimonials, your Quality Score improves and your cost per click goes down. Your conversion rate also improves, so you need fewer clicks to get a customer.

**Happy customers who leave reviews are more loyal.** The act of writing a testimonial reinforces their positive feelings about you. They're more likely to come back and more likely to refer friends.

---

## The cost comparison

Let's compare the cost of different channels for a small service business acquiring one new client:

| Channel | Cost per acquired customer |
|---|---|
| Google Ads | £80–300 |
| Facebook Ads | £50–200 |
| SEO (agency) | £150–500 (amortised) |
| Referral from happy customer | £0 |
| Testimonial that converts cold visitor | £0 |

The bottom two don't show up in marketing budgets because they feel like they "just happen." But they don't just happen — they require a system. Building that system is the highest-ROI marketing investment a small business can make.

---

## Why most small businesses don't do this

There are three common blockers:

**"I don't have many customers yet."** Start now anyway. 10 testimonials collected from your first 20 customers are infinitely more valuable than the 0 you have today. The system scales as you scale.

**"My customers won't bother."** Most people are willing to leave a review if asked at the right moment with minimal friction. The key is timing (right after the experience) and ease (a direct link, no login, 30 seconds).

**"I'm worried about negative reviews."** This is real. The solution is to create a private channel for negative feedback — so unhappy customers reach you instead of Google. This is what separates sophisticated review systems from just "asking people to leave Google reviews."

---

## Where to start

You don't need a big budget or a marketing team. You need:

1. A simple review collection page (not a Google review link — something you control)
2. A habit of sending that link after every transaction
3. Somewhere to display the results where it counts

That's it. The businesses that win on social proof aren't doing anything complicated — they're just doing it consistently.
    `,
  },
]

function renderContent(markdown) {
  const lines = markdown.trim().split('\n')
  const elements = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-xl font-bold text-white mt-10 mb-4">
          {line.replace('## ', '')}
        </h2>
      )
    } else if (line.startsWith('**') && line.endsWith('**') && line.includes(':')) {
      const text = line.replace(/\*\*/g, '')
      const [label, ...rest] = text.split(':')
      elements.push(
        <p key={i} className="text-gray-300 leading-relaxed mb-3">
          <strong className="text-white">{label}:</strong>{rest.join(':')}
        </p>
      )
    } else if (line.startsWith('- ')) {
      const items = []
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].replace('- ', ''))
        i++
      }
      elements.push(
        <ul key={`ul-${i}`} className="list-disc list-inside space-y-2 text-gray-300 mb-4 ml-2">
          {items.map((item, j) => <li key={j}>{item}</li>)}
        </ul>
      )
      continue
    } else if (line.startsWith('| ')) {
      const tableLines = []
      while (i < lines.length && lines[i].startsWith('|')) {
        tableLines.push(lines[i])
        i++
      }
      const [header, , ...rows] = tableLines
      const headers = header.split('|').filter(h => h.trim()).map(h => h.trim())
      elements.push(
        <div key={`table-${i}`} className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-700">
                {headers.map((h, j) => <th key={j} className="text-left py-2 px-3 text-gray-400 font-medium">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rIdx) => {
                const cells = row.split('|').filter(c => c.trim()).map(c => c.trim())
                return (
                  <tr key={rIdx} className="border-b border-gray-800">
                    {cells.map((c, cIdx) => <td key={cIdx} className="py-2 px-3 text-gray-300">{c}</td>)}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )
      continue
    } else if (line.startsWith('```')) {
      const codeLines = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      elements.push(
        <pre key={`code-${i}`} className="bg-gray-900 border border-gray-700 rounded-lg p-4 text-sm text-gray-300 overflow-x-auto mb-4 font-mono">
          {codeLines.join('\n')}
        </pre>
      )
    } else if (line === '---') {
      elements.push(<hr key={i} className="border-gray-800 my-8" />)
    } else if (line.trim() === '') {
      // skip blank lines
    } else {
      // Inline bold/italic parsing
      const parsed = line
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/`(.+?)`/g, '<code class="bg-gray-800 px-1 rounded text-indigo-300 text-sm">$1</code>')
      elements.push(
        <p
          key={i}
          className="text-gray-300 leading-relaxed mb-4"
          dangerouslySetInnerHTML={{ __html: parsed }}
        />
      )
    }
    i++
  }

  return elements
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = POSTS.find((p) => p.slug === slug)
  usePageMeta({
    path: `/blog/${slug}`,
    title: post ? `${post.title} — Fimi Blog` : 'Blog — Fimi',
    description: post ? post.excerpt : undefined,
  })

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-gray-400 text-sm">
        Post not found. <Link to="/blog" className="ml-2 text-indigo-400 hover:underline">Back to blog →</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between max-w-5xl mx-auto">
        <Link to="/" className="font-bold text-lg tracking-tight">
          Fimi <span className="text-xs text-gray-500 font-normal ml-1">φήμη · /ˈfi.mi/ · reputation</span>
        </Link>
        <Link to="/register" className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
          Try free →
        </Link>
      </nav>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
        <Link to="/blog" className="text-sm text-indigo-400 hover:text-indigo-300 mb-8 inline-block">
          ← All posts
        </Link>

        <div className="mb-8">
          <div className="text-xs text-indigo-400 uppercase tracking-wide mb-3">{post.category}</div>
          <h1 className="text-3xl font-bold leading-tight mb-4">{post.title}</h1>
          <div className="text-sm text-gray-500">{post.date} · {post.readTime} read</div>
        </div>

        <article className="prose-invert">
          {renderContent(post.content)}
        </article>

        {/* CTA */}
        <div className="mt-12 bg-indigo-900/20 border border-indigo-700 rounded-2xl p-6 text-center space-y-3">
          <p className="font-bold text-lg">Try Fimi free — no credit card required</p>
          <p className="text-gray-400 text-sm">Set up in 5 minutes. Start collecting reviews today.</p>
          <Link
            to="/register"
            className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl transition"
          >
            Start free →
          </Link>
        </div>

        {/* Other posts */}
        <div className="mt-10 border-t border-gray-800 pt-8">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-4">More from the blog</p>
          <div className="space-y-3">
            {POSTS.filter((p) => p.slug !== slug).map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className="block text-indigo-400 hover:text-indigo-300 text-sm hover:underline">
                {p.title}
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
