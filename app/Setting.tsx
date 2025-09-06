import { ThemedText } from '@/components/ThemedText';
import { ThemedSafeAreaView, ThemedView } from '@/components/ThemedView';
import Header from '@/components/ui/Header';
import { useThemeCustom } from '@/components/ui/theme-context';
import { Fonts } from '@/constants/Fonts';
import { Strings } from '@/constants/Strings';
import MarginHW from '@/utils/MarginHW';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

const Setting = () => {
  const navigation = useNavigation();
  const { mode, setMode } = useThemeCustom();

  console.log("mode", mode);

  return (
    <ThemedSafeAreaView style={Styles.main}>
      <Header title="Settings" back={true} navigation={navigation} settings={true} />
      <ThemedView style={Styles.optionView}>
        <ThemedText style={Styles.toggleText}>{Strings.Toggle}</ThemedText>
        <TouchableOpacity
          onPress={() => {
            if (mode === 'dark') setMode('light');
            else if (mode === 'light') setMode('dark');
            else setMode('light');
          }}
        >
          <MaterialIcons
            name={mode === 'dark' ? 'toggle-off' : 'toggle-on'}
            size={MarginHW.MarginW50}
            color={mode === 'dark' ? 'grey' : 'green'}
          />
        </TouchableOpacity>
      </ThemedView>
      <ThemedView style={Styles.optionView}>
        <ThemedText style={Styles.toggleText}>{Strings.System}</ThemedText>
        <TouchableOpacity onPress={() => setMode('system')}>
          <MaterialIcons
            name={mode === 'system' ? 'toggle-on' : 'toggle-off'}
            size={MarginHW.MarginW50}
            color={mode === 'system' ? 'green' : 'grey'}
          />
        </TouchableOpacity>
      </ThemedView>
    </ThemedSafeAreaView>
  );
};

export default Setting;

const Styles = StyleSheet.create({
  main: { flex: 1 },
  toggleText: { fontFamily: Fonts.jakartaMedium, fontSize: 16 },
  optionView: {
    padding: MarginHW.MarginH20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
