import { StyleSheet, Text, type TextProps } from "react-native";

import { Fonts, ThemeColor } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

export type ThemedTextProps = TextProps & {
  type?:
    | "default"
    | "title"
    | "subtitle"
    | "small"
    | "smallBold"
    | "link"
    | "linkPrimary"
    | "code";
  themeColor?: ThemeColor;
};

export function ThemedText({
  style,
  type = "default",
  themeColor,
  ...rest
}: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      style={[{ color: theme[themeColor ?? "text"] }, styles[type], style]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontFamily: Fonts.karla,
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
  },
  title: {
    fontFamily: Fonts.markazi,
    fontSize: 64,
    fontWeight: "500",
    lineHeight: 64,
  },
  subtitle: {
    fontFamily: Fonts.markazi,
    fontSize: 40,
    fontWeight: "400",
    lineHeight: 40,
  },
  small: {
    fontFamily: Fonts.karla,
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
  },
  smallBold: {
    fontFamily: Fonts.karla,
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
  },
  link: {
    fontFamily: Fonts.karla,
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    textDecorationLine: "underline",
  },
  linkPrimary: {
    fontFamily: Fonts.karla,
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    textDecorationLine: "underline",
  },
  code: {
    fontFamily: Fonts.mono,
    fontSize: 12,
    fontWeight: "500",
  },
});
