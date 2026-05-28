// ALS-211 / ALS-222: Per-tier rate limiting — fixed-window minute + daily buckets
// Starter: 30 rpm / 500/day  |  Growth: 150 rpm / 5000/day  |  Enterprise: unlimited

import { adminClient } from './auth.ts';
import { corsHeaders } from './cors.ts';

export const TIER_LIMITS: Record<string, { rpm: number; rpd: number }> = {
  starter:    { rpm: 30,  rpd: 500 },
  growth:     { rpm: 150, rpd: 5_000 },
  enterprise: { rpm: 0,   rpd: 0 },  // 0 = unlimited
};

/**
 * Increment rate-limit counters and return a 429 Response if any limit is exceeded,
 * or null if the request is within quota.
 *
 * Buckets are fixed-window: one per UTC minute (rpm) and one per UTC day (rpd).
 * We increment before checking so the counter is always accurate even when the
 * request is ultimately rejected.
 */
export async function checkRateLimit(
  clientId: string,
  tier: string,
): Promise<Response | null> {
  const limits = TIER_LIMITS[tier] ?? TIER_LIMITS.starter;

  // Enterprise tier is unlimited — skip DB entirely
  if (limits.rpm === 0 && limits.rpd === 0) return null;

  const db = adminClient();
  const now = new Date();

  const minuteWindow = `m:${now.toISOString().slice(0, 16)}`;  // YYYY-MM-DDTHH:MM
  const dayWindow    = `d:${now.toISOString().slice(0, 10)}`;  // YYYY-MM-DD

  const minuteExpires = new Date(now);
  minuteExpires.setSeconds(60 - now.getSeconds(), 0);

  const dayExpires = new Date(now);
  dayExpires.setUTCHours(24, 0, 0, 0);

  const [minuteRes, dayRes] = await Promise.all([
    db.rpc('increment_rate_limit', {
      p_client_id:  clientId,
      p_window:     minuteWindow,
      p_expires_at: minuteExpires.toISOString(),
    }),
    db.rpc('increment_rate_limit', {
      p_client_id:  clientId,
      p_window:     dayWindow,
      p_expires_at: dayExpires.toISOString(),
    }),
  ]);

  const minuteCount = (minuteRes.data as number) ?? 0;
  const dayCount    = (dayRes.data as number) ?? 0;

  // Opportunistic cleanup: ~1% of requests purge expired rows
  if (Math.random() < 0.01) {
    db.rpc('cleanup_rate_limit_counters').then(() => {}).catch(() => {});
  }

  const rateLimitHeaders: Record<string, string> = {
    'X-RateLimit-Limit-Minute':     String(limits.rpm),
    'X-RateLimit-Remaining-Minute': String(Math.max(0, limits.rpm - minuteCount)),
    'X-RateLimit-Limit-Day':        String(limits.rpd),
    'X-RateLimit-Remaining-Day':    String(Math.max(0, limits.rpd - dayCount)),
  };

  if (minuteCount > limits.rpm) {
    const retryAfter = 60 - now.getSeconds();
    return new Response(
      JSON.stringify({ error: { code: 'RATE_LIMIT_EXCEEDED', message: `Rate limit exceeded: ${limits.rpm} requests per minute. Retry after ${retryAfter}s.` } }),
      {
        status: 429,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          ...rateLimitHeaders,
          'Retry-After': String(retryAfter),
        },
      },
    );
  }

  if (dayCount > limits.rpd) {
    const retryAfter = Math.floor((dayExpires.getTime() - now.getTime()) / 1_000);
    return new Response(
      JSON.stringify({ error: { code: 'DAILY_QUOTA_EXCEEDED', message: `Daily quota exceeded: ${limits.rpd} requests per day. Resets at midnight UTC.` } }),
      {
        status: 429,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          ...rateLimitHeaders,
          'Retry-After': String(retryAfter),
        },
      },
    );
  }

  return null;
}
