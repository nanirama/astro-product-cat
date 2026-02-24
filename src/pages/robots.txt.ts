// https://docs.astro.build/en/guides/integrations-guide/sitemap/#usage
import type { APIRoute } from 'astro';

const robotsTxt = `# Allow all crawlers including Facebook (facebookexternalhit) and Twitter (Twitterbot)
User-agent: *
Allow: /

# Explicitly allow social media bots
User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

Sitemap: https://astro-product-cat.pages.dev/sitemap-index.xml
`.trim();

export const GET: APIRoute = () => {
  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};