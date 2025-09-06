import { ThemedText } from "@/components/ThemedText";
import { ThemedSafeAreaView, ThemedView } from "@/components/ThemedView";
import Header from "@/components/ui/Header";
import ImageCard from "@/components/ui/ImageCard";
import { Fonts } from "@/constants/Fonts";
import { useImageList } from "@/hooks/useImageList";
import HWSize from "@/utils/HWSize";
import MarginHW from "@/utils/MarginHW";
import { getFavorites } from "@/utils/StorageHelper";
import { ImageType } from "@/utils/types";
import { LegendList } from "@legendapp/list";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
const PAGE_SIZE = 40;
const {height, width} = Dimensions.get('screen');
const Home = () => {
  const estimatedListSize = { width: width, height: height-HWSize.H_Height100 };
  const navigation = useNavigation();
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState(2); // 2 for name, 17 for creation date
  const [selectedOption, setSelectedOption] = useState("Name");
  const [selectedOrder, setSelectedOrder] = useState("Asc");
  const [order, setOrder] = useState(true); // true for ascending, false for descending
  const { data, loading } = useImageList(page, PAGE_SIZE, orderBy, order);
  const [imageData, setImageData] = useState<ImageType[]>([]);
  const [optionShow, setOptionShow] = useState(false);
  const [orderShow, setOrderShow] = useState(false);
  const [favorites, setFavorites] = React.useState<ImageType[]>([]);
  
  useEffect(() => {
    getFavs();
  }, []);
  const getFavs = async () => {
    const result = await getFavorites();
    setFavorites(result);
  };
  useEffect(() => {
    if (!data) return;
    if (page === 0) {
      setImageData(data);
    } else {
      setImageData((prev) => {
        const merged = [...prev, ...data];
        const unique = Array.from(
          new Map(merged.map((item) => [item.id, item])).values(),
        );
        return unique;
      });
    }
  }, [data, page, orderBy, order]);
  useEffect(() => {
    setImageData([]);
    setPage(0);
  }, [orderBy, order]);

  const renderItem = ({ item }: { item: ImageType }) => {
    return (
      <ImageCard
        data={imageData}
        navigation={navigation}
        item={item}
        favorites={favorites}
        refreshFavorites={getFavs}
      />
    );
  };
  return (
    <ThemedSafeAreaView style={Styles.main}>
      <Header navigation={navigation} title="TaskApp" />
      <ThemedView style={{ flex: 1 }}>
        <ThemedView
          style={Styles.mainSortView}
        >
          <TouchableOpacity
            style={Styles.sortView}
            onPress={() => setOptionShow(true)}
          >
            <ThemedText style={Styles.SortTitle}>Sort By: </ThemedText>
            <ThemedText style={Styles.SortOption}>{selectedOption}</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.sortOrderView}
            onPress={() => setOrderShow(true)}
          >
            <ThemedText style={Styles.SortTitle}>Sort Order: </ThemedText>
            <ThemedText style={Styles.SortOption}>{selectedOrder}</ThemedText>
          </TouchableOpacity>
        </ThemedView>
        <LegendList
          indicatorStyle="black"
          data={imageData}
          renderItem={renderItem}
          recycleItems
          estimatedListSize={estimatedListSize}
          extraData={favorites}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          drawDistance={estimatedListSize.height * 2}
          waitForInitialLayout
          columnWrapperStyle={{ columnGap: MarginHW.MarginW10 }}
          contentContainerStyle={{ padding: MarginHW.MarginH10 }}
          onRefresh={() => {
            setPage(0);
            getFavs();
          }}
          refreshing={loading}
          onEndReached={() => {
            if (!loading && data?.length === PAGE_SIZE) {
              setPage((prev) => prev + 1);
            }
          }}
        />
      </ThemedView>
      {optionShow && (
        <ThemedView style={Styles.optionView}>
          <ThemedView
            style={{
              width: HWSize.W_Width100,
              borderRadius: 8,
              padding: MarginHW.MarginH10,
            }}
          >
            <TouchableOpacity
              style={Styles.optionButton}
              onPress={() => {
                setSelectedOption("Name");
                setOrderBy(2);
                setOptionShow(false);
              }}
            >
              <ThemedText style={Styles.optionText}>Name</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={Styles.optionButton}
              onPress={() => {
                setSelectedOption("Date");
                setOrderBy(17);
                setOptionShow(false);
              }}
            >
              <ThemedText style={Styles.optionText}>Date</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                paddingVertical: MarginHW.MarginH8,
                alignSelf: "flex-end",
              }}
              onPress={() => setOptionShow(false)}
            >
              <ThemedText
                style={{ fontFamily: Fonts.JakartaSemiBold, fontSize: 16 }}
              >
                Close
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      )}
      {orderShow && (
        <ThemedView style={Styles.orderView}>
          <ThemedView
            style={{
              width: HWSize.W_Width100,
              borderRadius: 8,
              padding: MarginHW.MarginH10,
            }}
          >
            <TouchableOpacity
              style={Styles.optionButton}
              onPress={() => {
                setSelectedOrder("Asc");
                setOrder(true);
                setOrderShow(false);
              }}
            >
              <ThemedText style={Styles.optionText}>Asc</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={Styles.optionButton}
              onPress={() => {
                setSelectedOrder("Desc");
                setOrder(false);
                setOrderShow(false);
              }}
            >
              <ThemedText style={Styles.optionText}>Desc</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                paddingVertical: MarginHW.MarginH8,
                alignSelf: "flex-end",
              }}
              onPress={() => setOrderShow(false)}
            >
              <ThemedText
                style={{ fontFamily: Fonts.JakartaSemiBold, fontSize: 16 }}
              >
                Close
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      )}
    </ThemedSafeAreaView>
  );
};

export default Home;

const Styles = StyleSheet.create({
  main: { flex: 1 },
  mainSortView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sortView: {
    borderWidth: 0.5,
    marginHorizontal: MarginHW.MarginH10,
    padding: MarginHW.MarginH8,
    borderRadius: 8,
    marginVertical: MarginHW.MarginH10,
    flexDirection: "row",
    alignItems: "center",
  },
  sortOrderView: {
    borderWidth: 0.5,
    marginHorizontal: MarginHW.MarginH10,
    padding: MarginHW.MarginH8,
    borderRadius: 8,
    marginVertical: MarginHW.MarginH10,
    flexDirection: "row",
    alignItems: "center",
  },
  SortTitle: { fontFamily: Fonts.jakartaMedium, fontSize: 15 },
  optionView: {
    position: "absolute",
    marginVertical: HWSize.H_Height120,
    marginHorizontal: MarginHW.MarginW80,
    top: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
  },
  orderView: {
    position: "absolute",
    marginVertical: HWSize.H_Height140,
    right: MarginHW.MarginW20,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
  },
  SortOption: { fontFamily: Fonts.JakartaRegular, fontSize: 15 },
  optionButton: { paddingVertical: MarginHW.MarginH8 },
  optionText: { fontFamily: Fonts.JakartaRegular, fontSize: 16 },
});
