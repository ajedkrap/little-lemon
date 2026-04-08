import { useTheme } from "@/hooks/use-theme";
import { UserFormData } from "@/utils/types";
import * as ImagePicker from "expo-image-picker";
import { Dispatch, SetStateAction, useMemo } from "react";
import { Alert, TouchableOpacity, View, ViewProps } from "react-native";
import ImageView from "../atoms/ImageView";
import ThemedText from "../atoms/ThemedText";
import ThemedView from "../atoms/ThemedView";

export interface FieldAvatarProps extends ViewProps {
  form: UserFormData;
  setForm: Dispatch<SetStateAction<UserFormData>>;
}

const FieldAvatar: React.FC<FieldAvatarProps> = ({
  form,
  setForm,
  ...props
}) => {
  const theme = useTheme();

  const handleImagePress = async (event: "change" | "remove") => {
    switch (event) {
      case "change":
        // setForm({ ...form, image: UserImage });
        const permissionResult =
          await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
          Alert.alert(
            "Permission required",
            "Permission to access the media library is required.",
          );
          return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ["images", "videos"],
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.canceled) {
          setForm({ ...form, image: { uri: result.assets[0].uri } });
        }
        break;
      case "remove":
        setForm({ ...form, image: null });
        break;
    }
  };

  const image = useMemo(() => {
    if (form.image) {
      return form.image;
    }
    return null;
  }, [form.image]);

  return (
    <View {...props}>
      <ThemedText style={{ marginBottom: 8 }} type="small">
        Avatar
      </ThemedText>
      <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
        <ThemedView
          type="backgroundSelected"
          style={[
            {
              aspectRatio: 1,
              alignItems: "center",
              justifyContent: "center",
              width: 80,
              borderRadius: 80 / 2,
              overflow: "hidden",
            },
          ]}
        >
          {image ? (
            <ImageView
              containerStyle={{ height: 80, width: 80 }}
              contentFit="cover"
              style={{ flex: 1, height: null, width: null }}
              source={image}
            />
          ) : (
            <ThemedText type="sectionTitle" themeColor="textSecondary">
              {form.firstName?.charAt(0) + (form.lastName?.charAt(0) ?? "")}
            </ThemedText>
          )}
        </ThemedView>
        <TouchableOpacity onPress={() => handleImagePress("change")}>
          <View
            style={{
              backgroundColor: theme.primary,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 8,
              borderWidth: 2,
              borderColor: theme.primary,
            }}
          >
            <ThemedText style={{ color: theme.background }} type="cardTitle">
              Change
            </ThemedText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleImagePress("remove")}>
          <View
            style={{
              backgroundColor: theme.background,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderWidth: 2,
              borderColor: theme.primary,
            }}
          >
            <ThemedText style={{ color: theme.primary }} type="cardTitle">
              Remove
            </ThemedText>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FieldAvatar;
