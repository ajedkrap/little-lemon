import { Dimensions, PixelRatio } from "react-native";

type TSizePercentage = number | string;
type TScaledSizeInPercentage = (size: number | string) => number;
type TScaledSize = (size: number) => number;
type TScaledModeratedSize = (size: number, factor?: number) => number;

const { width, height } = Dimensions.get("window");
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const scale: TScaledSize = (size: number) =>
  (shortDimension / guidelineBaseWidth) * size;
const verticalScale: TScaledSize = (size: number) =>
  (longDimension / guidelineBaseHeight) * size;
const moderateScale: TScaledModeratedSize = (size: number, factor?: number) =>
  size + (scale(size) - size) * (factor ?? 0.5);
const moderateVerticalScale: TScaledSize = (size: number, factor?: number) =>
  size + (verticalScale(size) - size) * (factor ?? 0.5);

/**
 * Converts provided width percentage to independent pixel (dp).
 * @param widthPercent The percentage of screen's width that UI element should cover
 *                     along with the percentage symbol (%).
 * @return             The calculated dp depending on current device's screen width.
 */
const widthPercentageToDP: TScaledSizeInPercentage = (
  widthPercent: TSizePercentage,
) => {
  const elemWidth =
    typeof widthPercent === "number" ? widthPercent : parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((width * elemWidth) / 100);
};

/**
 * Converts provided height percentage to independent pixel (dp).
 * @param  heightPercent The percentage of screen's height that UI element should cover
 *               s        along with the percentage symbol (%).
 * @return               The calculated dp depending on current device's screen height.
 */
const heightPercentageToDP: TScaledSizeInPercentage = (
  heightPercent: TSizePercentage,
) => {
  const elemHeight =
    typeof heightPercent === "number"
      ? heightPercent
      : parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((height * elemHeight) / 100);
};

const percentageCalculation = (max: number, val: number) => max * (val / 100);

const fontCalculation = (val: number) => {
  const widthDimension = height > width ? width : height;
  const aspectRatioBasedHeight = (16 / 9) * widthDimension;
  return percentageCalculation(
    Math.sqrt(
      Math.pow(aspectRatioBasedHeight, 2) + Math.pow(widthDimension, 2),
    ),
    val,
  );
};

export const responsiveHeight = (h: number) => {
  const { height } = Dimensions.get("window");
  return percentageCalculation(height, h);
};

export const responsiveWidth = (w: number) => {
  const { width } = Dimensions.get("window");
  return percentageCalculation(width, w);
};

export const s = scale;
export const vs = verticalScale;
export const ms = moderateScale;
export const mvs = moderateVerticalScale;
export const rh = responsiveHeight;
export const rw = responsiveWidth;
export const wpdp = widthPercentageToDP;
export const hpdp = heightPercentageToDP;
export const scaleFont = fontCalculation;
