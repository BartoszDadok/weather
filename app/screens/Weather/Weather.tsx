import {
  useWeather,
  getLocations,
  LocationResponse,
} from "@/app/api/tanstack-api/weather";
import { Image, View } from "react-native";
import { styles } from "./Weather.styles";
import { Loading } from "@/app/components/Loading";
import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WeatherSearchBar } from "./WeatherSearchBar";
import { WeatherDropdown } from "./WeatherDropdown";
import { WeatherDaysCarousel } from "./WeatherDaysCarousel";
import { WeatherMetadata } from "./WeatherMetadata";
import { WeatherData } from "./WeatherData";
import Toast from "react-native-toast-message";

const imagePath = require("../../assets/icons/mountain.jpg");

const DEFAULT_LOCATION = "Lisbon";
const DEFAULT_DAYS = 7;

const errorToastOptions = {
  type: "error",
  text1: "Something went wrong, Please try again later!",
};

const Weather = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [locations, setLocations] = useState<Array<LocationResponse>>([]);
  const [selectedLocation, setSelectedLocation] = useState(DEFAULT_LOCATION);

  const { bottom } = useSafeAreaInsets();
  const {
    data: weather,
    isLoading,
    error,
  } = useWeather({ city: selectedLocation, days: DEFAULT_DAYS });

  const handleSearch = async (city: string) => {
    try {
      const data = await getLocations({ city });
      setLocations(data);
    } catch (error) {
      Toast.show(errorToastOptions);
    }
  };

  const handleLocation = (name: string) => {
    setSelectedLocation(name);
    setLocations([]);
    setShowSearchBar(false);
  };

  useEffect(() => {
    if (error) {
      Toast.show(errorToastOptions);
    }
  }, [error]);

  return (
    <View style={styles.screenContainer}>
      <Image style={styles.image} blurRadius={25} source={imagePath} />
      <View style={styles.contentContainer}>
        {isLoading || !weather ? (
          <Loading testID="loading" />
        ) : (
          <>
            <WeatherSearchBar
              showSearchBar={showSearchBar}
              handleSearch={handleSearch}
              setShowSearchBar={setShowSearchBar}
            />
            <View
              style={[styles.weatherDataContainer, { marginBottom: bottom }]}
            >
              <WeatherData
                current={weather.current}
                location={weather.location}
              />
              <WeatherMetadata current={weather.current} />
              <WeatherDaysCarousel forecastday={weather.forecast.forecastday} />
            </View>
          </>
        )}
        <WeatherDropdown
          locations={locations}
          showSearchBar={showSearchBar}
          handleLocation={handleLocation}
        />
      </View>
    </View>
  );
};

export { Weather };
