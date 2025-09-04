import { ThemedSafeAreaView, ThemedView } from '@/components/ThemedView';
import Header from '@/components/ui/Header';
import ImageCard from '@/components/ui/ImageCard';
import { useImageList } from '@/hooks/useImageList';
import MarginHW from '@/utils/MarginHW';
import { ImageType } from '@/utils/types';
import { LegendList } from '@legendapp/list';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
const PAGE_SIZE = 40;
const home = () => {
  const [page, setPage] = useState(0);
  const { data, loading, error } = useImageList(page, PAGE_SIZE);
  const [imageData, setImageData] = useState<ImageType[]>([]);

  useEffect(() => {
    if (!data) return;
    if (page === 0) {
      setImageData(data);
    } else {
      setImageData(prev => {
        const merged = [...prev, ...data];
        const unique = Array.from(new Map(merged.map(item => [item.id, item])).values());
        return unique;
      });
    }
  }, [data, page]);
  const renderItem = ({ item }: { item: any }) => {
    return (
      <ThemedView>
     <ImageCard item={item}/>
      </ThemedView>
    )
  }
  return (
    <ThemedSafeAreaView style={Styles.main}>
      <Header title='TaskApp'/>
      <ThemedView style={{flex:1}}>
      <LegendList
      indicatorStyle='black'
      data={imageData}
      renderItem={renderItem}
      estimatedItemSize={120}
      keyExtractor={(item) => String(item.id)}
      numColumns={2}
      columnWrapperStyle={{columnGap:MarginHW.MarginW10}}
      contentContainerStyle={{padding:MarginHW.MarginH10}}
      recycleItems={true}
      onRefresh={() => {
        setPage(0);
        setImageData([]);
      }}
      refreshing={loading}
      onEndReached={() => {
        if (!loading && data?.length === PAGE_SIZE) {
          setPage(prev => prev + 1);
        }
      }}
      />
      </ThemedView>
    </ThemedSafeAreaView>
  )
}

export default home

const Styles = StyleSheet.create({
main:{flex:1}
})