import { Current, LocationWeather } from "@/app/api/tanstack-api/weather";
import { weatherImages } from "@/app/utils";
import { Image, Text, View } from "react-native";
import { styles } from "./WeatherData.styles";

type WeatherDataProps = {
  location?: LocationWeather;
  current?: Current;
};

const WeatherData = ({ location, current }: WeatherDataProps) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.locationText}>
          {`${location?.name}, ${location?.country}`}
        </Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={weatherImages[current?.condition?.text || ""]}
          resizeMethod="resize"
          style={styles.image}
        />
      </View>
      <View>
        <Text style={styles.temperatureText}>{current?.temp_c}&#176;</Text>
        <Text style={styles.stateText}>{current?.condition?.text}</Text>
      </View>
    </>
  );
};

export { WeatherData };
