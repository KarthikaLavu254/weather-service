import { Request, Response, NextFunction } from 'express';

// error handler for 400, 502, 500
export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err.status === 400) {
    return res.status(400).json({ error: err.message || 'Bad Request' });
  }
  if (err.status === 502) {
    return res.status(502).json({ error: err.message || 'Bad Gateway' });
  }
  // Default to 500
  res.status(500).json({ error: err.message || 'Internal Server Error' });
}

