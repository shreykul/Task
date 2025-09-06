import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import {
  ThemeProviderCustom,
  useThemeCustom,
} from "@/components/ui/theme-context";
import { NavProps } from "@/utils/types";

function AppNavigator() {
  const { theme } = useThemeCustom();

  return (
    <ThemeProvider value={theme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="screens" options={{ headerShown: false }} />
        <Stack.Screen name="ZoomedPic" options={{ headerShown: false }} />
        <Stack.Screen name="Setting" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    JakartaBold: require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    JakartaMedium: require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    JakartaRegular: require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    JakartaSemiBold: require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
    JakartaLight: require("../assets/fonts/PlusJakartaSans-Light.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProviderCustom>
      <AppNavigator />
    </ThemeProviderCustom>
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
