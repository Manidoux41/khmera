const attempts = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 15 * 60 * 1000;

// Per-process protection only; a shared edge limiter is required at launch.
export function allowLoginAttempt(key: string, now = Date.now()) {
  for (const [id, value] of attempts) if (value.reset <= now) attempts.delete(id);
  const current = attempts.get(key);
  if (!current && attempts.size >= 2000) return false;
  const next = current ?? { count: 0, reset: now + WINDOW_MS };
  next.count++;
  attempts.set(key, next);
  return next.count <= 10;
}
