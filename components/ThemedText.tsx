import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  gray?: boolean;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'medium' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  gray,
  type = 'default',
  ...rest
}: ThemedTextProps) {

  // Gets the color from the theme (light or dark)
  const color = useThemeColor({ light: lightColor, dark: darkColor }, gray ? 'fontGray' : 'font');

  //Definition of the text base styles
  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'medium' ? styles.medium : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  medium: {
    fontSize: 18,
    fontWeight: '600',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
