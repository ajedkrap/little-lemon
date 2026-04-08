import { Colors, Fonts } from "@/constants/theme";
import { s } from "@/themes/scale";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import ThemedText, { ThemedTextType } from "../atoms/ThemedText";

interface FieldProps extends TextInputProps {
  status?: "normal" | "error" | "success" | "disabled";
  label?: string;
  helper?: string;
  helperStyle?: StyleProp<TextStyle>;
  helperContainerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  inputContStyle?: StyleProp<ViewStyle>;
  labelType?: ThemedTextType;
}

const Field: React.FC<FieldProps> = (props) => {
  const {
    status = "normal",
    label,
    labelStyle,
    labelType = "leadText",
    containerStyle,
    inputContStyle,
    helper,
    helperStyle,
    helperContainerStyle,
    ...fieldProps
  } = props;

  return (
    <View style={StyleSheet.flatten([styles.container, containerStyle])}>
      {label && label !== "" && (
        <ThemedText
          style={StyleSheet.flatten([styles.label, labelStyle])}
          type={labelType}
        >
          {label}
        </ThemedText>
      )}
      <View
        style={StyleSheet.flatten([
          styles.inputContainer,
          styles[status === "error" ? "error" : "normal"],
          inputContStyle,
        ])}
      >
        <TextInput
          {...fieldProps}
          style={StyleSheet.flatten([styles.input, fieldProps.style])}
        />
      </View>
      <View style={[styles.helperContainer, helperContainerStyle]}>
        {helper && (
          <ThemedText
            type="small"
            style={[
              styles.helper,
              status === "error" ? styles.helperError : {},
              helperStyle,
            ]}
          >
            {helper}
          </ThemedText>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingVertical: s(8),
  },
  inputContainer: {
    borderWidth: 1,
    paddingVertical: s(8),
    paddingHorizontal: s(16),
    borderRadius: s(8),
  },
  normal: {
    borderColor: Colors.light.primary,
  },
  error: {
    borderColor: "red",
  },
  label: {
    paddingBottom: s(4),
    fontWeight: "800",
  },
  input: {
    fontFamily: Fonts.karlaRegular,
    fontSize: 16,
    alignItems: "center",
  },
  helperContainer: {
    height: 16,
  },
  helper: {
    color: Colors.light.textSecondary,
    lineHeight: 16,
  },
  helperError: {
    color: "red",
  },
});

export default Field;
