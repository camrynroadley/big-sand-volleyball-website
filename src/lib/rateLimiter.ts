const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

export function rateLimit(ip: string, limit = 5, interval = 60_000): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.timestamp > interval) {
    // reset window
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (record.count >= limit) {
    return true; // rate limited
  }

  // increment count
  rateLimitMap.set(ip, { ...record, count: record.count + 1 });
  return false;
}
