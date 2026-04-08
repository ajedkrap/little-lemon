import { FlatList, StyleSheet } from "react-native";
import ThemedText from "../atoms/ThemedText";
import ThemedView from "../atoms/ThemedView";
import FoodTypeChip from "../molecules/FoodTypeChip";

import { FOOD_TYPES } from "@/constants/menu";
import { getMenuItems, MenuRow } from "@/data/database";
import { useTheme } from "@/hooks/use-theme";
import Metrics from "@/themes/metrics";
import { useCallback, useEffect, useRef, useState } from "react";
import FoodCard from "../molecules/FoodCard";

export interface FoodListProps {
  searchText?: string;
}

const FoodList: React.FC<FoodListProps> = ({ searchText = "" }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [menuItems, setMenuItems] = useState<MenuRow[]>([]);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounce search text by 500ms
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 500);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [searchText]);

  // Fetch menu whenever categories or debounced search changes
  const fetchMenu = useCallback(async () => {
    const items = await getMenuItems(selectedCategories, debouncedSearch);
    setMenuItems(items);
  }, [selectedCategories, debouncedSearch]);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  const handleFoodTypePress = (foodType: string) => {
    setSelectedCategories((prev) =>
      prev.includes(foodType)
        ? prev.filter((c) => c !== foodType)
        : [...prev, foodType],
    );
  };

  const theme = useTheme();

  return (
    <ThemedView style={styles.container}>
      <ThemedView
        style={[
          styles.foodContainer,
          { borderBottomColor: theme.backgroundSelected },
        ]}
      >
        <ThemedText style={styles.categoryTitle} type="categoryTitle">
          ORDER FOR DELIVERY!
        </ThemedText>

        <FlatList
          data={FOOD_TYPES}
          horizontal
          contentContainerStyle={styles.foodTypeListContent}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <FoodTypeChip
              label={item}
              selected={selectedCategories.includes(item)}
              onPress={handleFoodTypePress}
            />
          )}
          showsHorizontalScrollIndicator={false}
        />
      </ThemedView>
      <FlatList
        data={menuItems}
        renderItem={({ item }) => <FoodCard food={item} />}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
        ListEmptyComponent={() => (
          <ThemedText type="categoryTitle">No food found</ThemedText>
        )}
        ItemSeparatorComponent={() => (
          <ThemedView type="backgroundElement" style={styles.itemSeparator} />
        )}
        contentContainerStyle={styles.menuListContent}
      />
    </ThemedView>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  foodContainer: {
    paddingVertical: 24,
    borderBottomWidth: 1,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
    elevation: 10,
  },
  foodTypeChip: {
    padding: 8,
    borderRadius: 10,
  },
  categoryTitle: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  foodTypeListContent: {
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  menuListContent: {
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: Metrics.bottomSpace,
  },
  itemSeparator: {
    height: 1,
    marginVertical: 12,
  },
});

export default FoodList;
