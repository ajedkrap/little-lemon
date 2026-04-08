import { useTheme } from "@/hooks/use-theme";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { TouchableOpacity, View } from "react-native";
import ThemedText from "../atoms/ThemedText";

export interface CheckboxProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, value, onChange }) => {
  const theme = useTheme();

  return (
    <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
      <TouchableOpacity onPress={() => onChange(!value)}>
        <Icon
          name={value ? "checkbox-marked" : "checkbox-blank-outline"}
          size={24}
          color={theme.primary}
        />
      </TouchableOpacity>
      <ThemedText type="small">{label}</ThemedText>
    </View>
  );
};

export default Checkbox;
