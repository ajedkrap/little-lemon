import "@/global.css";

import { Platform } from "react-native";

// ─── Brand Colors ─────────────────────────────────────────────────────────────
// Source: Little Lemon Style Guide
export const BrandColors = {
  // Primary
  green: "#495E57",
  yellow: "#F4CE14",
  // Secondary
  salmon: "#EE9972",
  peach: "#FBDABB",
  // Highlight
  cloud: "#EDEFEE",
  charcoal: "#333333",
} as const;

// ─── Semantic Color Tokens ────────────────────────────────────────────────────
export const Colors = {
  light: {
    text: BrandColors.charcoal,
    textSecondary: BrandColors.green,
    background: "#FFFFFF",
    backgroundElement: BrandColors.cloud,
    backgroundSelected: "#D8DAD9",
    primary: BrandColors.green,
    accent: BrandColors.yellow,
  },
  dark: {
    text: BrandColors.cloud,
    textSecondary: BrandColors.peach,
    background: BrandColors.charcoal,
    backgroundElement: "#444444",
    backgroundSelected: "#555555",
    primary: BrandColors.yellow,
    accent: BrandColors.green,
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

// ─── Typefaces ────────────────────────────────────────────────────────────────
// Font files: src/assets/fonts/MarkaziText-Regular.ttf, Karla-Regular.ttf
export const Fonts = {
  markaziRegular: "MarkaziText-Regular", // Markazi Text — headlines & display
  markaziMedium: "MarkaziText-Medium", // Markazi Text — headlines & display
  markaziSemiBold: "MarkaziText-SemiBold", // Markazi Text — headlines & display
  markaziBold: "MarkaziText-Bold", // Markazi Text — headlines & display
  karlaRegular: "Karla-Regular", // Karla — body, labels, UI
  karlaMedium: "Karla-Medium", // Karla — body, labels, UI
  karlaSemiBold: "Karla-SemiBold", // Karla — body, labels, UI
  karlaBold: "Karla-Bold", // Karla — body, labels, UI
  mono:
    Platform.select({ ios: "ui-monospace", default: "monospace" }) ??
    "monospace",
} as const;

// ─── Spacing Scale ────────────────────────────────────────────────────────────
export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
