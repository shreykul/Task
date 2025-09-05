import { handleNavigation } from "@/app/_layout";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import MarginHW from "@/utils/MarginHW";
import { ImageResponse, ImageType } from "@/utils/types";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Skeleton } from "moti/skeleton";
import React, { useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

const ImageCard = ({
  item,
  navigation,
  data,
}: {
  item: ImageType;
  navigation: any;
  data: ImageResponse;
}) => {
  const { width } = Dimensions.get("screen");
  const cardWidth = width / 2 - 15;
  const [loaded, setLoaded] = useState(false);

  return (
    <ThemedView style={{ width: cardWidth, margin: 5 }}>
      <TouchableOpacity
        onPress={() =>
          handleNavigation({
            type: "push",
            navigation: navigation,
            page: "ZoomedPic",
            passProps: { data, startIndex: item.id },
          })
        }
      >
        <ThemedView style={Styles.background}>
          <Skeleton
            show={!loaded}
            radius={8}
            width="100%"
            height={120}
            colors={["#808080", "#f5f5f5"]}
          >
            <Image
              source={{ uri: item.thumbnail_url }}
              style={Styles.imageStyles}
              contentFit="cover"
              onLoadEnd={() => setLoaded(true)}
              cachePolicy="disk"
              transition={500}
            />
          </Skeleton>
          <TouchableOpacity
            style={Styles.button}
            onPress={() => console.log("Favorite pressed:", item.id)}
          >
            <MaterialIcons name="favorite-border" size={20} color="white" />
          </TouchableOpacity>
        </ThemedView>
      </TouchableOpacity>
      <ThemedText style={Styles.text} numberOfLines={1} ellipsizeMode="tail">
        {item.name}
      </ThemedText>
    </ThemedView>
  );
};

export default ImageCard;
const Styles = StyleSheet.create({
  imageStyles: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    backgroundColor: "#e1e1e1",
  },
  background: { position: "relative", backgroundColor: "#f0f0f0" },
  button: {
    position: "absolute",
    top: MarginHW.MarginH8,
    right: MarginHW.MarginW8,
    backgroundColor: Colors.light.transparent,
    borderRadius: 16,
    padding: MarginHW.MarginH4,
  },
  text: { fontFamily: Fonts.jakartaMedium, marginTop: MarginHW.MarginH4 },
});
