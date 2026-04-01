import { Link } from 'react-router-dom'
import { POSTS } from './BlogPost'
import { usePageMeta } from '../hooks/useCanonical'

export default function BlogIndex() {
  usePageMeta({
    path: '/blog',
    title: 'Blog — Fimi | Testimonial & Review Collection Tips',
    description: 'Guides and tips on collecting customer testimonials, handling negative reviews, embedding social proof on your website, and growing your business with reviews.',
  })
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

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Fimi Blog</h1>
          <p className="text-gray-400">Guides on collecting reviews, building social proof, and growing your business.</p>
        </div>

        <div className="space-y-6">
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="block bg-gray-900 border border-gray-800 hover:border-indigo-700 rounded-xl p-6 transition group"
            >
              <div className="text-xs text-indigo-400 mb-2 uppercase tracking-wide">{post.category}</div>
              <h2 className="text-lg font-bold text-white group-hover:text-indigo-300 transition mb-2">{post.title}</h2>
              <p className="text-gray-400 text-sm leading-relaxed">{post.excerpt}</p>
              <div className="text-xs text-gray-600 mt-3">{post.date} · {post.readTime} read</div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
