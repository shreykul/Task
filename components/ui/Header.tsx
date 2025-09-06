import { handleNavigation } from "@/app/_layout";
import { Fonts } from "@/constants/Fonts";
import MarginHW from "@/utils/MarginHW";
import { HeaderProps } from "@/utils/types";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { useThemeCustom } from "./theme-context";

const Header = ({ title, back, navigation,settings }: HeaderProps) => {
  const { theme } = useThemeCustom();
  return (
    <ThemedView style={Styles.main}>
      <ThemedView style={Styles.backView}>
      {back && (
        <TouchableOpacity
          onPress={() => {
            handleNavigation({ type: "pop", navigation: navigation });
          }}
        >
          {theme === "dark" ? (
            <MaterialIcons name="arrow-back" size={24} color="white" />
          ) : (
            <MaterialIcons name="arrow-back" size={24} color="black" />
          )}
        </TouchableOpacity>
      )}
      <ThemedText style={Styles.fontTitle}>{title}</ThemedText>
      </ThemedView>
     {!settings && 
     <ThemedView>
      <TouchableOpacity
          onPress={() => {
            handleNavigation({ type: "push",page:'Setting', navigation: navigation });
          }}
        >
          {theme === "dark" ? (
            <MaterialIcons name="settings" size={24} color="white" />
          ) : (
            <MaterialIcons name="settings" size={24} color="black" />
          )}
        </TouchableOpacity>
      </ThemedView>}
    </ThemedView>
  );
};

export default Header;

const Styles = StyleSheet.create({
  main: {
    padding: MarginHW.MarginH10,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: MarginHW.MarginW10,
    borderBottomColor: "#e1e1e1",
    justifyContent: "space-between"
  },
  backView:{
    flexDirection: "row",
    alignItems: "center",
    gap: MarginHW.MarginW10,
  },
  fontTitle: { fontSize: 20, fontFamily: Fonts.jakartaBold },
});
