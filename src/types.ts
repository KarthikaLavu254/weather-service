
export interface WeatherResponse {
  shortForecast: string;
  temperature: number;
  temperatureUnit: string;
  tempType: 'hot' | 'cold' | 'moderate';
}

export interface NwsApiPointResponse {
  properties: {
    forecast: string;
  };
}

export interface NwsApiForecastResponse {
  properties: {
    periods: Array<{
      name: string;
      temperature: number;
      temperatureUnit: string;
      shortForecast: string;
    }>;
  };
}

