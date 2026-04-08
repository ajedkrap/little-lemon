import Metrics from "@/themes/metrics";
import { s } from "@/themes/scale";
import { useCallback, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewProps,
} from "react-native";
import ThemedText from "../atoms/ThemedText";
import ThemedView from "../atoms/ThemedView";
import Field from "../molecules/Field";
import { FULL_HEADER_HEIGHT } from "./Header";

type FormError = {
  error: boolean;
  message: string;
};

export type SignInFormData = {
  name: string;
  email: string;
};

export type SignInFormErrors = {
  name: FormError;
  email: FormError;
};

interface SignInFormProps extends ViewProps {
  onSubmit: (form: SignInFormData) => void;
}

const INITIAL_ERRORS: SignInFormErrors = {
  name: {
    error: false,
    message: "",
  },
  email: {
    error: false,
    message: "",
  },
};

const SignInForm: React.FC<SignInFormProps> = (props) => {
  const [form, setForm] = useState<SignInFormData>({
    name: "",
    email: "",
  });

  const [errors, setErrors] = useState<SignInFormErrors>(INITIAL_ERRORS);

  const handleChangeText = (key: string) => (text: string) => {
    setForm({ ...form, [key]: text && text !== "" ? text : "" });
    if (text && text !== "") {
      setErrors({ ...errors, [key]: { error: false, message: "" } });
    } else {
      setErrors({
        ...errors,
        [key]: { error: true, message: "This field is required" },
      });
    }
  };

  const handleSubmit = useCallback(() => {
    const errors = INITIAL_ERRORS;

    if (form.name.trim() && form.name.trim() === "") {
      errors.name.error = true;
      errors.name.message = "This field is required";
    }
    if (form.email.trim() && form.email.trim() === "") {
      errors.email.error = true;
      errors.email.message = "This field is required";
    }
    if (errors.name.error || errors.email.error) {
      setErrors(errors);
      return;
    } else {
      props.onSubmit(form);
    }
  }, [form, errors]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={s(18)}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <ThemedView style={styles.formContainer} type="backgroundElement">
            <View style={styles.titleContainer}>
              <ThemedText type="subtitle">Let us get to know you</ThemedText>
            </View>
            <View style={{ gap: s(8) }}>
              <Field
                value={form.name}
                status={errors.name.error ? "error" : "normal"}
                helper={errors.name.message}
                onChangeText={handleChangeText("name")}
                label="First Name"
                placeholder="Enter your first name"
                keyboardType="default"
                autoComplete="name"
                autoCorrect={false}
              />
              <Field
                value={form.email}
                status={errors.email.error ? "error" : "normal"}
                helper={errors.email.message}
                onChangeText={handleChangeText("email")}
                label="Email"
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
              />
            </View>
          </ThemedView>
          <ThemedView style={styles.footerContainer}>
            <TouchableOpacity onPress={handleSubmit}>
              <ThemedView
                type="backgroundElement"
                style={styles.buttonContainer}
              >
                <ThemedText type="subtitle">Next</ThemedText>
              </ThemedView>
            </TouchableOpacity>
          </ThemedView>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    height: Metrics.pureScreenHeight - FULL_HEADER_HEIGHT,
  },
  formContainer: {
    paddingVertical: s(8),
    paddingHorizontal: s(16),
    height: Metrics.pureScreenHeight - FULL_HEADER_HEIGHT - s(16),
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingBottom: s(64),
  },
  footerContainer: {
    paddingVertical: s(16),
    paddingBottom: Metrics.bottomSpace,
    paddingRight: s(16),
    alignItems: "flex-end",
  },
  buttonContainer: {
    paddingVertical: s(8),
    paddingHorizontal: s(24),
    borderRadius: s(8),
  },
});

export default SignInForm;
