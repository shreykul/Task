import { useImageList } from '@/hooks/useImageList';
import { LegendList } from '@legendapp/list';
import React, { useState } from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const PAGE_SIZE = 40;
const home = () => {
  const { width } = Dimensions.get('screen');
  const [page, setPage] = useState(0);
  const { data, loading, error } = useImageList(page, PAGE_SIZE);
  console.log('loading???',loading);
  console.log('error???',error);
  console.log('data???',data);
  const renderItem = ({ item }: { item: any }) => {
    return (
      <View style={{flex:1,alignItems:'center',marginVertical:1,marginHorizontal:10}}>
      <Image src={item.thumbnail_url} style={{height:100,width:width/2}}/>
      <Text>{item.name}</Text>
      </View>
    )
  }
  return (
    <SafeAreaView style={{flex:1}}>
      <Text>home</Text>
      <View style={{flex:1}}>
      <LegendList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
      />
      </View>
    </SafeAreaView>
  )
}

export default home