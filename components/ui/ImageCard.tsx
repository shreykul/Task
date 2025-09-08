import { handleNavigation } from "@/app/_layout";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import MarginHW from "@/utils/MarginHW";
import { addFavorite, removeFavorite } from "@/utils/StorageHelper";
import { ImageType } from "@/utils/types";
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
  favorites,
  refreshFavorites,
}: {
  item: ImageType;
  navigation: any;
  data: ImageType[];
  favorites: ImageType[];
  refreshFavorites: () => void;
}) => {
  const { width } = Dimensions.get("screen");
  const cardWidth = width / 2 - 15;
  const [loaded, setLoaded] = useState(false);
  const isFavorite = favorites?.some((fav) => fav.id === item.id);

  const toggleFavorite = async () => {
    if (isFavorite) {
      console.log("Removing from favorites:", item);
      await removeFavorite(item.id);
    } else {
      console.log("Adding to favorites:", item);
      await addFavorite(item);
    }
    refreshFavorites();
  };

  return (
    <ThemedView style={{ width: cardWidth, margin: 5 }}>
      <TouchableOpacity
      testID="image-card"
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
              source={{ uri: item.thumbnailUrl }}
              style={Styles.imageStyles}
              contentFit="cover"
              onLoadEnd={() => setLoaded(true)}
              cachePolicy="disk"
              transition={500}
            />
          </Skeleton>
          <TouchableOpacity
          testID="favorite-button" 
            style={Styles.button}
            onPress={() => toggleFavorite()}
          >
            <MaterialIcons
              name={isFavorite ? "favorite" : "favorite-border"}
              size={20}
              color="white"
            />
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
  background: { position: "relative", backgroundColor: "#f0f0f0",},
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
