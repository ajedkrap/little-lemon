import { StyleSheet, Text, type TextProps } from "react-native";

import { Fonts, ThemeColor } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

/**
 * Typography scale — Little Lemon Style Guide
 *
 * Markazi Text (serif)
 *   displayTitle  64pt Medium  — hero / display title
 *   subtitle      40pt Regular — sub title, keep close to display
 *
 * Karla (sans-serif)
 *   leadText      18pt Medium    — lead text, CTA, home page
 *   sectionTitle  20pt ExtraBold — section title, UPPERCASE
 *   categoryTitle 16pt ExtraBold — "This Week's Specials", categories
 *   cardTitle     18pt Bold      — food card title
 *   default       16pt Regular   — paragraph, 1.5× line-height
 *   highlight     16pt Medium    — price / highlight text
 *   small         14pt Regular   — small labels
 *   link          14pt Regular   — underlined link
 */
export type ThemedTextType =
  | "displayTitle"
  | "subtitle"
  | "leadText"
  | "sectionTitle"
  | "categoryTitle"
  | "cardTitle"
  | "default"
  | "highlight"
  | "small"
  | "link";

export type ThemedTextProps = TextProps & {
  type?: ThemedTextType;
  themeColor?: ThemeColor;
};

const ThemedText = ({
  style,
  type = "default",
  themeColor,
  ...rest
}: ThemedTextProps) => {
  const theme = useTheme();

  return (
    <Text
      style={[{ color: theme[themeColor ?? "text"] }, styles[type], style]}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  // Markazi Text
  displayTitle: {
    fontFamily: Fonts.markaziMedium,
    fontSize: 64,
    lineHeight: 64,
  },
  subtitle: {
    fontFamily: Fonts.markaziRegular,
    fontSize: 40,
    lineHeight: 40,
  },

  // Karla
  leadText: {
    fontFamily: Fonts.karlaMedium,
    fontSize: 18,
    lineHeight: 27,
  },
  sectionTitle: {
    fontFamily: Fonts.karlaBold,
    fontSize: 20,
    lineHeight: 28,
    textTransform: "uppercase",
  },
  categoryTitle: {
    fontFamily: Fonts.karlaBold,
    fontSize: 16,
    lineHeight: 22,
  },
  cardTitle: {
    fontFamily: Fonts.karlaSemiBold,
    fontSize: 18,
    lineHeight: 26,
  },
  default: {
    fontFamily: Fonts.karlaRegular,
    fontSize: 16,
    lineHeight: 24,
  },
  highlight: {
    fontFamily: Fonts.karlaMedium,
    fontSize: 16,
    lineHeight: 22,
  },
  small: {
    fontFamily: Fonts.karlaRegular,
    fontSize: 14,
    lineHeight: 20,
  },
  link: {
    fontFamily: Fonts.karlaRegular,
    fontSize: 14,
    lineHeight: 20,
    textDecorationLine: "underline",
  },
});

export default ThemedText;
