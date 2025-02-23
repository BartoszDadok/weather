import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "@/app/api/axios-api";
import {
  CityParam,
  ForecastParams,
  LocationResponse,
  WeatherResponse,
} from "./weather.types";
import { environment } from "@/app/environment";

const FORECAST_JSON = "/forecast.json";
const SEARCH_JSON = "/search.json";

const API_KEY_PARAM = `?key=${environment.weatherApiKey}`;

const getWeather = async ({ city, days }: ForecastParams) => {
  const { data } = await axiosClient.get<WeatherResponse>(
    `${FORECAST_JSON}${API_KEY_PARAM}&q=${city}&days=${days}&aqi=yes&alerts=yes`
  );
  return data;
};
const getLocations = async ({ city }: CityParam) => {
  const { data } = await axiosClient.get<Array<LocationResponse>>(
    `${SEARCH_JSON}${API_KEY_PARAM}&q=${city}`
  );
  return data;
};
const useWeather = (params: ForecastParams) =>
  useQuery({
    queryKey: ["Weather", params],
    queryFn: () => getWeather(params),
    placeholderData: (prev) => prev,
  });

export { useWeather, getLocations };
