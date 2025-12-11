import { Router, Request, Response, NextFunction } from 'express';
import { getWeatherForecast } from '../services/NwsApiService';
import { WeatherResponse } from '../types';

export const weatherRouter = Router();

weatherRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const lat = req.query.lat;
  const lon = req.query.lon;

  // Minimal input validation (no libraries)
  if (!lat || !lon || isNaN(Number(lat)) || isNaN(Number(lon))) {
    return res.status(400).json({ error: 'Invalid lat/lon' });
  }

  try {
    const forecast = await getWeatherForecast(Number(lat), Number(lon));
    res.json(forecast);
  } catch (err) {
    next(err);
  }
});
