import { Forecastday } from "@/app/api/tanstack-api/weather";
import { weatherImages } from "@/app/utils";
import { Image, ScrollView, Text, View } from "react-native";
import { styles } from "./WeatherDaysCarousel.styles";

type WeatherDaysCarouselProps = {
  forecastday?: Array<Forecastday>;
};

const WeatherDaysCarousel = ({ forecastday }: WeatherDaysCarouselProps) => {
  return (
    <View style={styles.carouselContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {forecastday?.map((days, index) => {
          const date = new Date(days.date);
          const dayName = date.toLocaleDateString("en-US", {
            weekday: "long",
          });
          return (
            <View key={index} style={styles.carouselItemContainer}>
              <Image
                source={weatherImages[days?.day?.condition?.text]}
                style={styles.image}
              />
              <Text style={styles.dayText} numberOfLines={1}>
                {dayName}
              </Text>
              <Text style={styles.tempText}>{days?.day?.avgtemp_c}&#176;</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export { WeatherDaysCarousel };
