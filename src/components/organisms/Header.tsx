import Logo from "@/assets/images/little-lemon/logo.png";
import ThemedView from "@/components/atoms/ThemedView";
import { ThemeColor } from "@/constants/theme";
import { RootStackParamList } from "@/navigation/AppNavigator";
import Metrics from "@/themes/metrics";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { Icon, VectorIcon } from "expo-router";
import { useTheme } from "@/hooks/use-theme";
import { useMemo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import ImageView from "../atoms/ImageView";
import Avatar from "../molecules/Avatar";

export const HEADER_PADDING_TOP = Metrics.statusBarHeight;
export const HEADER_HEIGHT = 64;
export const FULL_HEADER_HEIGHT = HEADER_PADDING_TOP + HEADER_HEIGHT;

export interface HeaderProps {
  type?: "normal" | "profile";
  bgType?: ThemeColor;
  onPressRight?: () => void;
  onPressLeft?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  type = "normal",
  bgType = "backgroundSelected",
  onPressRight = null,
  onPressLeft = null,
}) => {
  const theme = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const isProfile = type === "profile";

  const canGoBack = useMemo(() => navigation.canGoBack(), [navigation]);

  return (
    <ThemedView style={styles.container} type={bgType}>
      {isProfile && (
        <ThemedView style={styles.leftCont}>
          <ThemedView style={styles.flexOne}>
            {(canGoBack || onPressLeft) && (
              <TouchableOpacity
                style={styles.backButton}
                onPress={() =>
                  onPressLeft ? onPressLeft() : navigation.goBack()
                }
              >
                <Icon
                  name="arrow-left"
                  color={theme.background}
                  style={[styles.iconStyle, { backgroundColor: theme.primary }]}
                  size={24}
                />
              </TouchableOpacity>
            )}
          </ThemedView>
        </ThemedView>
      )}

      <ImageView
        source={Logo}
        contentFit="contain"
        containerStyle={[styles.imageContainer, { flex: 4 }]}
        style={styles.image}
      />

      {isProfile && (
        <ThemedView style={styles.rightCont}>
          <Avatar onPress={onPressRight || undefined} />
        </ThemedView>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: HEADER_PADDING_TOP,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageContainer: {
    height: HEADER_HEIGHT,
    width: 180,
    paddingVertical: 12,
  },
  image: {
    flex: 1,
    height: null,
    width: null,
  },
  leftCont: {
    minWidth: 64,
  },
  rightCont: {
    minWidth: 64,
  },
  flexOne: {
    flex: 1,
  },
  backButton: {
    paddingLeft: 12,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  iconStyle: {
    padding: 8,
    borderRadius: 24,
  },
});

export default Header;
