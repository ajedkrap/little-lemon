import { getUser } from "@/data/database";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { ImageSource, StyleSheet, TouchableOpacity } from "react-native";
import ImageView from "../atoms/ImageView";
import ThemedText from "../atoms/ThemedText";
import ThemedView from "../atoms/ThemedView";

export interface AvatarProps {
  size?: number;
  onPress?: () => void;
}

const Avatar = ({ size = 42, onPress = () => {} }: AvatarProps) => {
  const [acronym, setAcronym] = useState("LL");
  const [image, setImage] = useState<ImageSource | null>(null);

  const getUserData = async () => {
    const form = await getUser();
    if (form && form.image) {
      setImage(form.image as ImageSource | number);
    }
    if (form && form.firstName && form.firstName !== "") {
      let acronym: string = form.firstName.charAt(0);
      if (form.lastName && form.lastName !== "") {
        acronym += form.lastName.charAt(0);
      }
      setAcronym(acronym);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUserData();
    }, []),
  );

  return (
    <TouchableOpacity onPress={onPress}>
      <ThemedView
        type="backgroundSelected"
        style={[
          styles.container,
          {
            width: size,
            borderRadius: size / 2,
            overflow: "hidden",
          },
        ]}
      >
        {image ? (
          <ImageView
            source={image as any}
            contentFit="cover"
            containerStyle={{ width: size, height: size }}
            style={{ flex: 1, width: null, height: null }}
          />
        ) : (
          <ThemedText type="sectionTitle" themeColor="textSecondary">
            {acronym}
          </ThemedText>
        )}
      </ThemedView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Avatar;
