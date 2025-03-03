import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {

  // Get the background color based on the theme
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'primary');

  // Render the view with the primary background color of the theme
  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}