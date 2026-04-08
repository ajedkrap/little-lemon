import Constants from "expo-constants";
import { Dimensions, Platform } from "react-native";
import { initialWindowMetrics } from "react-native-safe-area-context";
import { s } from "./scale";

interface IMetric {
  screenWidth: number;
  screenHeight: number;
  headerHeight: number;
  bottomTabHeight: number;
  keyboardVerticalOffset: number;
  statusBarHeight: number;
  bottomSpace: number;
  pureScreenHeight: number;
  maximumHeightModal: number;
  bottomNavigationSpace: number;
}

const { width, height } = Dimensions.get("window");
const IPHONE_WITH_BUTTON_STATUSBAR_HEIGHT = 20;

const isIphoneX = () => {
  return (
    Platform.OS === "ios" &&
    !Platform.isPad &&
    !Platform.isTV &&
    (height === 780 ||
      width === 780 ||
      height === 812 ||
      width === 812 ||
      height === 844 ||
      width === 844 ||
      height === 896 ||
      width === 896 ||
      height === 926 ||
      width === 926)
  );
};

const statusBarHeight: number = Platform.select({
  ios: Constants.statusBarHeight ?? 20,
  android: Constants.statusBarHeight ?? 0,
  default: 0,
});

const hasDynamicIsland = () => Platform.OS === "ios" && statusBarHeight >= 50;

// const IPHONE_STATUS_BAR_HEIGHT: any = {
//   "iPhone 17 Pro Max": 54,
//   "iPhone 17 Pro": 54,
//   "iPhone 17 Air": 54,
//   "iPhone 17": 54,
//   "iPhone 16 Pro Max": 54,
//   "iPhone 16 Pro": 54,
//   "iPhone 16 Plus": 54,
//   "iPhone 16": 54,
//   "iPhone 15 Pro Max": 54,
//   "iPhone 15 Pro": 54,
//   "iPhone 15 Plus": 54,
//   "iPhone 15": 54,
//   "iPhone 14 Pro Max": 54,
//   "iPhone 14 Pro": 54,
//   "iPhone 14 Plus": 47,
//   "iPhone 14": 47,
//   "iPhone SE 3rd gen": 20,
//   "iPhone 13 Pro Max": 47,
//   "iPhone 13 Pro": 47,
//   "iPhone 13": 47,
//   "iPhone 13 mini": 50,
//   "iPhone 12 Pro Max": 47,
//   "iPhone 12 Pro": 47,
//   "iPhone 12": 47,
//   "iPhone 12 mini": 50,
//   "iPhone SE 2nd gen": 20,
//   "iPhone 11 Pro Max": 44,
//   "iPhone 11 Pro": 44,
//   "iPhone 11": 48,
//   "iPhone XS Max": 44,
//   "iPhone XS": 44,
//   "iPhone XR": 48,
//   "iPhone X": 44,
//   "iPhone 8 Plus": 20,
//   "iPhone 8": 20,
//   "iPhone 7 Plus": 20,
//   "iPhone 7": 20,
//   "iPhone SE 1st gen": 20,
//   "iPhone 6s Plus": 20,
//   "iPhone 6s": 20,
//   "iPhone 6 Plus": 20,
//   "iPhone 6": 20,
// };

const ifIphoneX = (iphoneXStyle: number, regularStyle: number) => {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
};

const getBottomSpace = () => {
  return isIphoneX() ? 34 : 0;
};

const bottomSpace =
  initialWindowMetrics?.insets.bottom ?? (hasDynamicIsland() ? 34 : 0);

const Metrics: IMetric = {
  screenWidth: width,
  screenHeight: height,

  headerHeight: s(44),
  bottomTabHeight: s(60),
  keyboardVerticalOffset: statusBarHeight + 44,

  statusBarHeight,
  bottomSpace,
  pureScreenHeight:
    width < height
      ? height - statusBarHeight - bottomSpace
      : width - statusBarHeight - bottomSpace,
  maximumHeightModal: height - statusBarHeight,
  bottomNavigationSpace: s(92),
};

export default Metrics;
