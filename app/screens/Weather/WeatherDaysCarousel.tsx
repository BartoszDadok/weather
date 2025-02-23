import { Forecastday } from "@/app/api/tanstack-api/weather";
import { weatherImages } from "@/app/utils";
import { Image, ScrollView, Text, View } from "react-native";
import { styles } from "./WeatherDaysCarousel.styles";

type WeatherDaysCarouselProps = {
  forecastday: Array<Forecastday>;
};

const WeatherDaysCarousel = ({ forecastday }: WeatherDaysCarouselProps) => {
  return (
    <View style={styles.carouselContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {forecastday?.map(({ day, date }, index) => {
          const newDate = new Date(date);
          const dayName = newDate.toLocaleDateString("en-US", {
            weekday: "long",
          });
          return (
            <View key={index} style={styles.carouselItemContainer}>
              <Image
                source={
                  weatherImages[day?.condition?.text] || weatherImages.other
                }
                style={styles.image}
              />
              <Text style={styles.dayText} numberOfLines={1}>
                {dayName}
              </Text>
              <Text style={styles.tempText}>{day?.avgtemp_c}&#176;</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export { WeatherDaysCarousel };
