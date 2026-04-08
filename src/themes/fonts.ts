import { Platform } from "react-native";

// Little Lemon brand typefaces
export const Fonts = {
  // Markazi Text — headlines / display
  markazi: "MarkaziText-Regular",
  markaziMedium: "MarkaziText-Medium",
  markaziSemiBold: "MarkaziText-SemiBold",
  markaziBold: "MarkaziText-Bold",
  // Karla — body, UI labels
  karla: "Karla-Regular",
  karlaMedium: "Karla-Medium",
  karlaSemiBold: "Karla-SemiBold",
  karlaBold: "Karla-Bold",
  mono:
    Platform.select({ ios: "ui-monospace", default: "monospace" }) ??
    "monospace",
} as const;
