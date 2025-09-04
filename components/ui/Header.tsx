import { Fonts } from '@/constants/Fonts'
import MarginHW from '@/utils/MarginHW'
import React from 'react'
import { StyleSheet, useColorScheme } from 'react-native'
import { ThemedText } from '../ThemedText'
import { ThemedView } from '../ThemedView'

const Header = ({title}:{title:string}) => {
  const scheme = useColorScheme();

  return (
    <ThemedView style={Styles.main}>
      <ThemedText style={Styles.fontTitle}>{title}</ThemedText>
    </ThemedView>
  )
}

export default Header

const Styles =StyleSheet.create({
    main:{padding:MarginHW.MarginH10,borderBottomWidth:1,flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottomColor:'#e1e1e1'},
    fontTitle:{fontSize:20,fontFamily:Fonts.jakartaBold}
})