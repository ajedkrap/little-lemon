import { Image, ImageProps, ImageStyle } from "expo-image";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

export interface IImageViewStyle extends ImageStyle {}

export interface IImageViewProps extends ImageProps {
  containerStyle?: StyleProp<ViewStyle>;
}

const ImageView: React.FC<IImageViewProps> = (props) => {
  const { containerStyle = {}, ...otherProps } = props;

  return (
    <View style={[StyleSheet.flatten(containerStyle)]}>
      <Image {...otherProps} />
    </View>
  );
};

export default ImageView;
