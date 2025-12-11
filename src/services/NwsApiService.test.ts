import axios from 'axios';
import { getWeatherForecast } from './NwsApiService';
import { WeatherResponse } from '../types';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getWeatherForecast', () => {
  afterEach(() => jest.clearAllMocks());

  it('returns forecast and tempType for valid response', async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: { properties: { forecast: 'forecast-url' } } })
      .mockResolvedValueOnce({ data: { properties: { periods: [ { shortForecast: 'Sunny', temperature: 90, temperatureUnit: 'F' } ] } } });
    const result: WeatherResponse = await getWeatherForecast(32.8140, -96.9489);
    expect(result).toEqual({
      shortForecast: 'Sunny',
      temperature: 90,
      temperatureUnit: 'F',
      tempType: 'hot',
    });
  });

  it('throws 502 on NWS API error', async () => {
    mockedAxios.get.mockRejectedValueOnce({ response: {} });
    await expect(getWeatherForecast(0, 0)).rejects.toMatchObject({ status: 502 });
  });

  it('throws 500 on network error', async () => {
    mockedAxios.get.mockRejectedValueOnce({});
    await expect(getWeatherForecast(0, 0)).rejects.toMatchObject({ status: 500 });
  });
});

