import { ThemedText } from "@/components/ThemedText";
import { ThemedSafeAreaView, ThemedView } from "@/components/ThemedView";
import Header from "@/components/ui/Header";
import ImageCard from "@/components/ui/ImageCard";
import MarginHW from "@/utils/MarginHW";
import { getFavorites } from "@/utils/StorageHelper";
import { ImageType } from "@/utils/types";
import { LegendList } from "@legendapp/list";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";

const Explore = () => {
  const navigation = useNavigation();
  const [favorites, setFavorites] = React.useState<ImageType[]>([]);

  useEffect(() => {
    getFavs();
  }, []);

  const getFavs = async () => {
    const result = await getFavorites();
    setFavorites(result || []);
  };

  const renderItem = ({ item }: { item: ImageType }) => {
    return (
      <ImageCard
        data={favorites}
        navigation={navigation}
        item={item}
        favorites={favorites}
        refreshFavorites={getFavs}
      />
    );
  };

  const renderEmpty = () => (
    <View style={Styles.emptyContainer}>
      <ThemedText style={Styles.emptyText}>No favorites yet</ThemedText>
      <ThemedText style={Styles.emptySubText}>Pull down to refresh</ThemedText>
    </View>
  );

  return (
    <ThemedSafeAreaView style={Styles.main}>
      <ThemedView>
        <Header navigation={navigation} title="Favorites" />
        <LegendList
          indicatorStyle="black"
          data={favorites}
          renderItem={renderItem}
          estimatedItemSize={120}
          extraData={favorites}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          onRefresh={getFavs}
          columnWrapperStyle={{ columnGap: MarginHW.MarginW10 }}
          contentContainerStyle={{ padding: MarginHW.MarginH10, flexGrow: 1 }}
          recycleItems={true}
          ListEmptyComponent={renderEmpty}
        />
      </ThemedView>
    </ThemedSafeAreaView>
  );
};

export default Explore;

const Styles = StyleSheet.create({
  main: { flex: 1 },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: MarginHW.MarginH40,
  },
  emptyText: {
    fontSize: 18,
    marginBottom: MarginHW.MarginH8,
  },
  emptySubText: {
    fontSize: 14,
    color: "#666",
  },
});
