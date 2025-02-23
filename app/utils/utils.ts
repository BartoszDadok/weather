import { Dimensions } from "react-native";

const BOTTOM_TOAST_OFFSET = 80;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const weatherImages = {
  Sunny: require("../assets/images/sun.png"),
  Clear: require("../assets/images/sun.png"),
  Overcast: require("../assets/images/cloud.png"),
  Cloudy: require("../assets/images/cloud.png"),
  Mist: require("../assets/images/mist.png"),
  other: require("../assets/images/moderaterain.png"),
  "Partly cloudy": require("../assets/images/partlycloudy.png"),
  "Moderate rain": require("../assets/images/moderaterain.png"),
  "Patchy rain possible": require("../assets/images/moderaterain.png"),
  "Light rain": require("../assets/images/moderaterain.png"),
  "Patchy rain nearby": require("../assets/images/moderaterain.png"),
  "Moderate rain at times": require("../assets/images/moderaterain.png"),
  "Heavy rain": require("../assets/images/heavyrain.png"),
  "Heavy rain at times": require("../assets/images/heavyrain.png"),
  "Moderate or heavy freezing rain": require("../assets/images/heavyrain.png"),
  "Moderate or heavy rain shower": require("../assets/images/heavyrain.png"),
  "Moderate or heavy rain with thunder": require("../assets/images/heavyrain.png"),
} as Record<string, any>;

export { weatherImages };

export { BOTTOM_TOAST_OFFSET, SCREEN_WIDTH, SCREEN_HEIGHT };
