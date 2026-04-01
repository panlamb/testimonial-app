const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');

const router = express.Router();

// Simple in-memory rate limit: max 10 requests per IP per hour
const rateLimits = new Map();
function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimits.get(ip) || { count: 0, resetAt: now + 60 * 60 * 1000 };
  if (now > entry.resetAt) { entry.count = 0; entry.resetAt = now + 60 * 60 * 1000; }
  entry.count++;
  rateLimits.set(ip, entry);
  return entry.count > 10;
}

router.post('/review-response', async (req, res) => {
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(503).json({ error: 'AI service not configured' });
  }

  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip;
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Try again in an hour.' });
  }

  const { review, businessName } = req.body || {};
  if (!review?.trim()) return res.status(400).json({ error: 'Review text is required' });

  try {
    const client = new Anthropic();
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 250,
      messages: [{
        role: 'user',
        content: `A customer left this negative review for "${businessName || 'our business'}": "${review}"\n\nWrite a short, professional, empathetic public response (3-4 sentences). Acknowledge the issue, apologize sincerely, and invite them to contact you directly to resolve it. Do not be defensive. Return only the response text.`,
      }],
    });
    res.json({ response: message.content[0].text.trim() });
  } catch (err) {
    console.error('Review response tool error:', err);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

module.exports = router;
