import GalleryStrip from "@/components/GalleryStrip";
import { ThemedText } from "@/components/ThemedText";
import { ThemedSafeAreaView, ThemedView } from "@/components/ThemedView";
import ZoomableImage from "@/components/ZoomableImage";
import Header from "@/components/ui/Header";
import { Fonts } from "@/constants/Fonts";
import { Strings } from "@/constants/Strings";
import { downloadImage, shareImage } from "@/utils/Helpers";
import MarginHW from "@/utils/MarginHW";
import { ImageType } from "@/utils/types";
import { MaterialIcons } from "@expo/vector-icons";
import { LegendList, LegendListRef } from "@legendapp/list";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "moti";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
const { width } = Dimensions.get("screen");
const ZoomedPic = () => {
  const animValue = useSharedValue(1);
  const route = useRoute();
  const navigation = useNavigation();
  const { data, startIndex } = route.params as any;
  const initialIndex = data.findIndex((img: any) => img.id === startIndex);
  const [currentIndex, setCurrentIndex] = useState(
    initialIndex >= 0 ? initialIndex : 0,
  );
  console.log("Current Index:", data);
  const [immersive, setImmersive] = useState(false);
  const [highLoaded, setHighLoaded] = useState(false);
  const item = data[currentIndex];
  const listRef = useRef<LegendListRef>(null);

  useEffect(() => {
    if (listRef.current && currentIndex >= 0) {
      listRef.current.scrollToIndex({
        index: currentIndex,
        animated: true,
        viewPosition: 0.5,
      });
    }
  }, [currentIndex]);
  const translateX = useSharedValue(0);

  const toggleImmersive = () => {
    const nextValue = immersive ? 1 : 0;
    setImmersive(!immersive);
    animValue.value = withTiming(nextValue, {
      duration: 400,
      easing: Easing.ease,
    });
  };

  const tapGesture = Gesture.Tap()
    .numberOfTaps(1)
    .onEnd(() => {
      runOnJS(toggleImmersive)();
    });

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
    })
    .onEnd((e) => {
      const threshold = 80;
      if (e.translationX > threshold && currentIndex > 0) {
        runOnJS(setCurrentIndex)(currentIndex - 1);
      } else if (
        e.translationX < -threshold &&
        currentIndex < data.length - 1
      ) {
        runOnJS(setCurrentIndex)(currentIndex + 1);
      }
      translateX.value = withTiming(0);
    });
  const composedGesture = Gesture.Simultaneous(tapGesture, panGesture);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animValue.value,
      transform: [
        {
          translateY: (1 - animValue.value) * 80,
        },
      ],
    };
  });

  const imageSwipeStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <ThemedSafeAreaView style={{ flex: 1 }}>
      {immersive && <StatusBar hidden={true} />}
      {!immersive && (
        <Header navigation={navigation} back title={item?.name || "Image"} />
      )}
      <ThemedView style={styles.themeStyles}>
        <ZoomableImage
          item={item}
          highLoaded={highLoaded}
          setHighLoaded={setHighLoaded}
          composedGesture={composedGesture}
          imageSwipeStyle={imageSwipeStyle}
        />
        <Animated.View style={[styles.galleryOverlay, animatedStyle]}>
          <LegendList<ImageType>
            data={data}
            ref={listRef}
            extraData={currentIndex}
            horizontal
            renderItem={({ item, index }) => (
              <GalleryStrip item={item} isActive={index === currentIndex} />
            )}
          />
          <View style={styles.actionView}>
            <TouchableOpacity style={styles.actionButton} onPress={() => {downloadImage(item.high_url)}}>
              <MaterialIcons name="download" size={28} color="#fff" style={{marginHorizontal:MarginHW.MarginH16}} />
              <ThemedText style={styles.actionText}>{Strings.Download}</ThemedText>
              </TouchableOpacity>
             <TouchableOpacity style={styles.actionButton}> 
              <MaterialIcons name="favorite" size={28} color="#fff" style={{marginHorizontal:MarginHW.MarginH16}} />
             <ThemedText style={styles.actionText}>{Strings.Favorite}</ThemedText>
             </TouchableOpacity>
             <TouchableOpacity style={styles.actionButton} onPress={() => {shareImage(item.high_url); console.log(item.high_url)}}>
              <MaterialIcons name="share" size={28} color="#fff" style={{marginHorizontal:MarginHW.MarginH16}} />
              <ThemedText style={styles.actionText}>{Strings.Share}</ThemedText>
              </TouchableOpacity>
          </View>
        </Animated.View>
      </ThemedView>
    </ThemedSafeAreaView>
  );
};

export default ZoomedPic;

const styles = StyleSheet.create({
  themeStyles: { flex: 1, justifyContent: "center", alignItems: "center" },
  touchStyles: { flex: 1, width: "100%", height: "100%" },
  imageStyles: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
  },
  highStyles: { width: width, height: "100%", resizeMode: "contain" },
  galleryOverlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingVertical: MarginHW.MarginH20,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  actionView:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    marginTop:MarginHW.MarginH8,
  },
  actionButton:{alignItems:'center'},
  actionText:{fontFamily:Fonts.jakartaMedium,fontSize:14,alignSelf:'center'}
});
