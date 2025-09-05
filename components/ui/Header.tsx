import { handleNavigation } from "@/app/_layout";
import { Fonts } from "@/constants/Fonts";
import MarginHW from "@/utils/MarginHW";
import { HeaderProps } from "@/utils/types";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

const Header = ({ title, back, navigation }: HeaderProps) => {
  const scheme = useColorScheme();
  return (
    <ThemedView style={Styles.main}>
      {back && (
        <TouchableOpacity
          onPress={() => {
            handleNavigation({ type: "pop", navigation: navigation });
          }}
        >
          {scheme === "dark" ? (
            <MaterialIcons name="arrow-back" size={24} color="white" />
          ) : (
            <MaterialIcons name="arrow-back" size={24} color="black" />
          )}
        </TouchableOpacity>
      )}
      <ThemedText style={Styles.fontTitle}>{title}</ThemedText>
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
  },
  fontTitle: { fontSize: 20, fontFamily: Fonts.jakartaBold },
});
