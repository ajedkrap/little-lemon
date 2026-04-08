import ThemedView from "@/components/atoms/ThemedView";
import Header from "@/components/organisms/Header";
import SigninForm, { SignInFormData } from "@/components/organisms/SigninForm";
import { useAuth } from "@/context/AuthContext";
import { UserFormData } from "@/utils/types";
import { StyleSheet } from "react-native";

const SignIn = () => {
  const { completeOnboarding } = useAuth();

  const handleSubmit = async (form: SignInFormData) => {
    const nameSplit = form.name.split(" ");

    const firstName =
      nameSplit.length > 1 ? nameSplit.slice(0, -1).join(" ") : nameSplit[0];
    const lastName =
      nameSplit.length > 1 ? nameSplit.slice(-1).join(" ") : null;
    const userFormData: UserFormData = {
      firstName,
      lastName,
      email: form.email,
      phone: null,
      image: null,
    };

    await completeOnboarding(userFormData);
  };

  return (
    <ThemedView style={styles.container} type="backgroundSelected">
      <Header bgType="backgroundSelected" />
      <SigninForm onSubmit={(form) => handleSubmit(form)} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SignIn;
