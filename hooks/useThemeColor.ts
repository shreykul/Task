import { useThemeCustom } from '@/components/ui/theme-context';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const { mode } = useThemeCustom();
  const systemTheme = useColorScheme() ?? 'light';
  const theme = mode === 'system' ? systemTheme : mode;
  const colorFromProps = props[theme];
  if (colorFromProps) return colorFromProps;

  return Colors[theme][colorName];
}
