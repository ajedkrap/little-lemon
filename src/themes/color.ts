export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

// Little Lemon brand colors per style guide
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

export const Colors = {
  light: {
    text: BrandColors.charcoal,
    background: "#ffffff",
    backgroundElement: BrandColors.cloud,
    backgroundSelected: "#D8DAD9",
    textSecondary: BrandColors.green,
    primary: BrandColors.green,
    accent: BrandColors.yellow,
  },
  dark: {
    text: BrandColors.cloud,
    background: BrandColors.charcoal,
    backgroundElement: "#444444",
    backgroundSelected: "#555555",
    textSecondary: BrandColors.peach,
    primary: BrandColors.yellow,
    accent: BrandColors.green,
  },
} as const;
