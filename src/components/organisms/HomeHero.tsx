import HeroImage from "@/assets/images/little-lemon/hero-image.png";
import ImageView from "@/components/atoms/ImageView";
import ThemedText from "@/components/atoms/ThemedText";
import { BrandColors } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Field from "../molecules/Field";
import { ThemedView } from "../themed-view";

export interface HomeHeroProps {
  searchText?: string;
  onSearchChange?: (text: string) => void;
}

const HomeHero: React.FC<HomeHeroProps> = ({ searchText, onSearchChange }) => {
  const theme = useTheme();
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (searchText) {
      setIsSearching(true);
    }
  }, [searchText]);

  const handleSearch = (text: string) => {
    onSearchChange?.(text);
  };

  const handleCloseSearch = () => {
    setIsSearching(false);
    handleSearch("");
  };

  return (
    <ThemedView style={styles.heroSection}>
      <ThemedText type="displayTitle" themeColor="accent">
        Little Lemon
      </ThemedText>
      <ThemedText
        type="subtitle"
        themeColor="background"
        style={styles.subtitle}
      >
        Chicago
      </ThemedText>
      <View style={styles.heroContent}>
        <ThemedText
          type="highlight"
          themeColor="background"
          style={styles.heroDescription}
        >
          We are a family owned Mediterranean restaurant, focused on traditional
          recipes served with a modern twist.
        </ThemedText>
        <ImageView
          source={HeroImage}
          containerStyle={styles.heroImageContainer}
          style={styles.heroImage}
        />
      </View>
      <View
        style={[
          styles.searchButtonContainer,
          isSearching ? {} : { alignItems: "flex-start" },
        ]}
      >
        {isSearching ? (
          <View style={styles.fieldSearch}>
            <Field
              value={searchText}
              containerStyle={{ flexGrow: 1 }}
              onChangeText={handleSearch}
              helperContainerStyle={{ height: 0 }}
              inputContStyle={{ backgroundColor: theme.backgroundElement }}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity onPress={handleCloseSearch}>
              <Icon
                name="close"
                color={theme.primary}
                style={[
                  styles.iconStyle,
                  { backgroundColor: theme.backgroundElement },
                ]}
                size={24}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={() => setIsSearching(true)}>
            <Icon
              name="magnify"
              color={theme.primary}
              style={[
                styles.iconStyle,
                { backgroundColor: theme.backgroundElement },
              ]}
              size={24}
            />
          </TouchableOpacity>
        )}
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  heroSection: {
    backgroundColor: BrandColors.green,
    padding: 16,
  },
  subtitle: {
    marginTop: -12,
  },
  heroContent: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: -24,
  },
  heroDescription: {
    maxWidth: "45%",
  },
  heroImageContainer: {
    width: 160,
    height: 160,
    borderRadius: 16,
    overflow: "hidden",
  },
  fieldSearch: {
    flexDirection: "row",
    flexGrow: 1,
    gap: 12,
    alignItems: "center",
  },
  heroImage: {
    flex: 1,
    height: null,
    width: null,
  },
  searchButtonContainer: {
    paddingTop: 16,
  },
  searchButton: {
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  iconStyle: {
    padding: 8,
    borderRadius: 24,
  },
});

export default HomeHero;
