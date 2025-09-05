import MarginHW from "@/utils/MarginHW";
import { ImageType } from "@/utils/types";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";

const GalleryStrip = ({
  item,
  isActive,
}: {
  item: ImageType;
  isActive: boolean;
}) => {
  return (
    <ThemedView style={[Styles.container, isActive && Styles.activeBorder]}>
      <Image
        source={{ uri: item.thumbnail_url }}
        style={Styles.imageStyles}
        contentFit="cover"
      />
    </ThemedView>
  );
};

export default GalleryStrip;

const Styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    marginHorizontal: MarginHW.MarginW3,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#222",
  },
  imageStyles: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  activeBorder: {
    borderWidth: 2,
    borderColor: "red",
  },
});
