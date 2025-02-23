import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import {
  useWeather,
  getLocations,
  Forecastday,
} from "@/app/api/tanstack-api/weather";
import { Weather } from "../Weather";
import Toast from "react-native-toast-message";
import { WeatherDaysCarousel } from "../WeatherDaysCarousel";

const mockWeatherData = {
  current: {
    temp_c: 20,
    condition: { text: "Sunny" },
    wind_kph: 10,
    humidity: 50,
    last_updated: new Date().toISOString(),
  },
  location: { name: "Lisbon", country: "Portugal" },
  forecast: {
    forecastday: [
      {
        date: new Date().toISOString(),
        day: {
          avgtemp_c: 22,
          condition: { text: "Partly cloudy" },
        },
      },
    ],
  },
};

jest.mock("@expo/vector-icons", () => ({
  AntDesign: jest.fn(),
  Entypo: jest.fn(),
  Feather: jest.fn(),
  FontAwesome5: jest.fn(),
}));

jest.mock("@/app/api/tanstack-api/weather");
jest.mock("react-native-toast-message", () => ({
  show: jest.fn(),
}));
jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ bottom: 0 }),
}));

const mockUseWeather = useWeather as jest.Mock;
const mockGetLocations = getLocations as jest.Mock;

describe("Weather Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly and shows loading state initially", () => {
    mockUseWeather.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    const { getByTestId } = render(<Weather />);
    expect(getByTestId("loading")).toBeTruthy();
  });

  it("renders weather data after loading", async () => {
    mockUseWeather.mockReturnValue({
      data: mockWeatherData,
      isLoading: false,
      error: null,
    });

    const { getByText } = render(<Weather />);

    await waitFor(() => {
      expect(getByText("Lisbon, Portugal")).toBeTruthy();
      expect(getByText("20°")).toBeTruthy();
      expect(getByText("Sunny")).toBeTruthy();
      expect(getByText("22°")).toBeTruthy();
    });
  });

  it("handles search and shows locations", async () => {
    const mockLocations = [{ name: "Lisbon", country: "Portugal" }];
    mockUseWeather.mockReturnValue({
      data: mockWeatherData,
      isLoading: false,
      error: null,
    });
    mockGetLocations.mockResolvedValue(mockLocations);

    const { getByPlaceholderText, getByText, getByTestId } = render(
      <Weather />
    );

    const searchIcon = getByTestId("search-icon");
    fireEvent.press(searchIcon);
    const searchInput = getByPlaceholderText("Search City");
    fireEvent.changeText(searchInput, "Lisbon");

    await waitFor(() => {
      expect(getByText("Lisbon, Portugal")).toBeTruthy();
    });
  });

  it("shows error toast on search failure", async () => {
    mockUseWeather.mockReturnValue({
      data: mockWeatherData,
      isLoading: false,
      error: null,
    });
    mockGetLocations.mockRejectedValue(new Error("Network Error"));

    const { getByPlaceholderText, getByTestId } = render(<Weather />);
    const searchIcon = getByTestId("search-icon");
    fireEvent.press(searchIcon);
    const searchInput = getByPlaceholderText("Search City");
    fireEvent.changeText(searchInput, "Lisbon");

    await waitFor(() => {
      expect(Toast.show).toHaveBeenCalledWith({
        type: "error",
        text1: "Something went wrong, Please try again later!",
      });
    });
  });

  it("renders WeatherDaysCarousel with forecast data", async () => {
    mockUseWeather.mockReturnValue({
      data: mockWeatherData,
      isLoading: false,
      error: null,
    });

    const { getByText } = render(<Weather />);
    await waitFor(() => {
      expect(getByText("Sunny")).toBeTruthy();
      expect(getByText("22°")).toBeTruthy();
    });
  });

  it("renders WeatherMetadata with current weather data", async () => {
    mockUseWeather.mockReturnValue({
      data: mockWeatherData,
      isLoading: false,
      error: null,
    });

    const { getByText } = render(<Weather />);
    await waitFor(() => {
      expect(getByText("10 km/h")).toBeTruthy();
      expect(getByText("50%")).toBeTruthy();
    });
  });

  it("renders WeatherDropdown with location suggestions", async () => {
    const mockLocations = [{ name: "Lisbon", country: "Portugal" }];
    mockUseWeather.mockReturnValue({
      data: mockWeatherData,
      isLoading: false,
      error: null,
    });
    mockGetLocations.mockResolvedValue(mockLocations);

    const { getByPlaceholderText, getByText, getByTestId } = render(
      <Weather />
    );
    const searchIcon = getByTestId("search-icon");

    fireEvent.press(searchIcon);

    const searchInput = getByPlaceholderText("Search City");

    fireEvent.changeText(searchInput, "Lisbon");
    await waitFor(() => {
      expect(getByText("Lisbon, Portugal")).toBeTruthy();
    });
  });

  it("renders WeatherData with location and current weather data", async () => {
    mockUseWeather.mockReturnValue({
      data: mockWeatherData,
      isLoading: false,
      error: null,
    });

    const { getByText } = render(<Weather />);

    await waitFor(() => {
      expect(getByText("Lisbon, Portugal")).toBeTruthy();
      expect(getByText("20°")).toBeTruthy();
      expect(getByText("Sunny")).toBeTruthy();
    });
  });
  it("renders day names correctly", () => {
    const mockForecastday = [
      {
        date: new Date("2025-02-24").toISOString(),
        day: {
          avgtemp_c: 22,
          condition: { text: "Partly cloudy" },
        },
      },
      {
        date: new Date("2025-02-25").toISOString(),
        day: {
          avgtemp_c: 18,
          condition: { text: "Rainy" },
        },
      },
      {
        date: new Date("2025-02-26").toISOString(),
        day: {
          avgtemp_c: 20,
          condition: { text: "Sunny" },
        },
      },
    ] as Array<Forecastday>;

    const { getByText } = render(
      <WeatherDaysCarousel forecastday={mockForecastday} />
    );

    expect(getByText("Monday")).toBeTruthy();
    expect(getByText("Tuesday")).toBeTruthy();
    expect(getByText("Wednesday")).toBeTruthy();
  });
});
