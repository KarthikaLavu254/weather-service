import { Request, Response, NextFunction } from 'express';

const requests: Record<string, { count: number; last: number }> = {};
const WINDOW = 60 * 1000; // 1 minute
const LIMIT = 30; // 30 requests per IP per minute

export function rateLimiter(req: Request, res: Response, next: NextFunction) {
  const ip = req.ip || (req.connection && req.connection.remoteAddress) || 'unknown';
  const now = Date.now();
  if (!requests[ip] || now - requests[ip].last > WINDOW) {
    requests[ip] = { count: 1, last: now };
  } else {
    requests[ip].count++;
    requests[ip].last = now;
  }
  if (requests[ip].count > LIMIT) {
    return res.status(429).json({ error: 'Too many requests.' });
  }
  next();
}
