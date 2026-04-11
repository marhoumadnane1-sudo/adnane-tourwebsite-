interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// In-memory store — resets on cold start. Sufficient for a single-instance deployment.
const store = new Map<string, RateLimitEntry>();

/**
 * Simple token-bucket rate limiter.
 * @param identifier  Unique key (e.g. IP address + route)
 * @param maxRequests Max requests allowed in the window
 * @param windowMs    Window duration in milliseconds
 */
export function rateLimit(
  identifier: string,
  maxRequests = 5,
  windowMs = 60_000
): { allowed: boolean; remaining: number; retryAfterMs: number } {
  const now = Date.now();
  const entry = store.get(identifier);

  if (!entry || now > entry.resetAt) {
    store.set(identifier, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1, retryAfterMs: 0 };
  }

  if (entry.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterMs: entry.resetAt - now,
    };
  }

  entry.count++;
  return {
    allowed: true,
    remaining: maxRequests - entry.count,
    retryAfterMs: 0,
  };
}

/** Extract the real client IP from Next.js request headers */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}
