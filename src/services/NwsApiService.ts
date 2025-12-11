import axios from 'axios';
import { WeatherResponse, NwsApiPointResponse, NwsApiForecastResponse } from '../types';

async function withRetries<T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> {
  let lastErr;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (i < retries - 1) await new Promise(res => setTimeout(res, delay));
    }
  }
  throw lastErr;
}

export async function getWeatherForecast(lat: number, lon: number): Promise<WeatherResponse> {
  try {
    const pointUrl = `https://api.weather.gov/points/${lat},${lon}`;
    const pointResp = await withRetries(() => axios.get<NwsApiPointResponse>(pointUrl, { timeout: 5000 }));
    const forecastUrl = pointResp.data.properties.forecast;

    const forecastResp = await withRetries(() => axios.get<NwsApiForecastResponse>(forecastUrl, { timeout: 5000 }));
    const today = forecastResp.data.properties.periods[0];

    const temp = today.temperature;
    let tempType: 'hot' | 'cold' | 'moderate';
    if (temp >= 85) tempType = 'hot';
    else if (temp <= 50) tempType = 'cold';
    else tempType = 'moderate';

    return {
      shortForecast: today.shortForecast,
      temperature: temp,
      temperatureUnit: today.temperatureUnit,
      tempType,
    };
  } catch (err: any) {
    if (err.response) {
      throw { status: 502, message: 'Error fetching data from NWS API.' };
    }
    throw { status: 500, message: 'Internal server error.' };
  }
}
