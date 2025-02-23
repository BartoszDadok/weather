import { Current } from "@/app/api/tanstack-api/weather";
import { Entypo, Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { styles } from "./WeatherMetadata.styles";
import { theme } from "@/app/theme";

type WeatherMetadataProps = {
  current?: Current;
};
const WeatherMetadata = ({ current }: WeatherMetadataProps) => {
  const lastUpdated = new Date(current?.last_updated || "").toLocaleTimeString(
    [],
    { hour: "2-digit", minute: "2-digit" }
  );
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.item}>
          <Feather name="wind" size={30} color={theme.pallette.text[700]} />
          <Text style={styles.itemText}>{current?.wind_kph} km/h</Text>
        </View>
        <View style={styles.item}>
          <Entypo name="drop" size={30} color={theme.pallette.text[700]} />
          <Text style={styles.itemText}>{current?.humidity}%</Text>
        </View>
        <View style={styles.item}>
          <Feather name="sun" size={30} color={theme.pallette.text[700]} />
          <Text style={styles.itemText}>{lastUpdated}</Text>
        </View>
      </View>
    </View>
  );
};

export { WeatherMetadata };
