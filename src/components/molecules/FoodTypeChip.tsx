import { useTheme } from "@/hooks/use-theme";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import ThemedText from "../atoms/ThemedText";
import ThemedView from "../atoms/ThemedView";

type FoodTypeChipProps = {
  label: string;
  selected?: boolean;
  style?: object;
  onPress?: (label: string) => void;
};

const FoodTypeChip: React.FC<FoodTypeChipProps> = ({
  label,
  selected = false,
  style,
  onPress = () => {},
}) => {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={() => onPress(label)}>
      <ThemedView
        type="backgroundSelected"
        style={[
          styles.chip,
          selected && { backgroundColor: theme.primary },
          style,
        ]}
      >
        <ThemedText
          type="highlight"
          style={[
            selected ? { color: theme.background } : undefined,
            styles.chipLabel,
          ]}
        >
          {label}
        </ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  chipLabel: {
    textTransform: "capitalize",
  },
});

export default FoodTypeChip;
