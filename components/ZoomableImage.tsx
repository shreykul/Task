import { ImageType } from "@/utils/types";
import React from "react";
import { ActivityIndicator, Dimensions, Image, StyleSheet } from "react-native";
import {
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import Zoom from "react-native-zoom-reanimated";

const { width } = Dimensions.get("screen");

type Props = {
  item: ImageType;
  highLoaded: boolean;
  setHighLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  composedGesture: any;
  imageSwipeStyle: any;
};

const ZoomableImage = ({
  item,
  highLoaded,
  setHighLoaded,
  composedGesture,
  imageSwipeStyle,
}: Props) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={composedGesture}>
        <Animated.View style={[{ flex: 1 }, imageSwipeStyle]}>
          <Zoom>
            <Image source={{ uri: item?.med_url }} style={styles.imageStyles} />
            <Image
              source={{ uri: item?.high_url }}
              style={styles.highStyles}
              onLoad={() => setHighLoaded(true)}
            />
          </Zoom>

          {!highLoaded && (
            <ActivityIndicator
              size="large"
              color="#666"
              style={{ position: "absolute" }}
            />
          )}
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default ZoomableImage;

const styles = StyleSheet.create({
  imageStyles: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
  },
  highStyles: { width: width, height: "100%", resizeMode: "contain" },
});
