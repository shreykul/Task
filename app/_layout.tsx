import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { NavProps } from "@/utils/types";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    JakartaBold: require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    JakartaMedium: require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    JakartaRegular: require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    JakartaSemiBold: require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
    JakartaLight: require("../assets/fonts/PlusJakartaSans-Light.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }
  const linking = {
    prefixes: ['myapp://'],
    config: {
      screens: {
        ZoomedPic: 'event/:eventId/image/:imageId',
      },
    },
  };

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="screens" options={{ headerShown: false }} />
        <Stack.Screen name="ZoomedPic" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </ThemeProvider>
  );
}

export function handleNavigation(nav: NavProps) {
  switch (nav.type) {
    case "push":
      nav.navigation.navigate(nav.page, nav.passProps);
      break;
    case "setRoot":
      nav.navigation.reset({ index: 0, routes: [{ name: nav.page }] });
      break;
    case "pop":
      nav.navigation.goBack();
      break;
    case "popToTop":
      nav.navigation.popToTop();
      break;
    case "navigate":
      nav.navigation.push(nav.page, nav.passProps);
      break;
  }
}
