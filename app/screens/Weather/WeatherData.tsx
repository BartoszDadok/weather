import { Current, LocationWeather } from "@/app/api/tanstack-api/weather";
import { weatherImages } from "@/app/utils";
import { Image, Text, View } from "react-native";
import { styles } from "./WeatherData.styles";

type WeatherDataProps = {
  location: LocationWeather;
  current: Current;
};

const WeatherData = ({
  location: { name, country },
  current: { condition, temp_c },
}: WeatherDataProps) => (
  <>
    <View style={styles.container}>
      <Text style={styles.locationText}>{`${name}, ${country}`}</Text>
    </View>

    <View style={styles.imageContainer}>
      <Image
        source={
          condition.text ? weatherImages[condition?.text] : weatherImages.other
        }
        resizeMethod="resize"
        style={styles.image}
      />
    </View>
    <View>
      <Text style={styles.temperatureText}>{temp_c}&#176;</Text>
      <Text style={styles.stateText}>{condition?.text}</Text>
    </View>
  </>
);

export { WeatherData };
