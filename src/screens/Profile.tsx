import ThemedView from "@/components/atoms/ThemedView";
import Header from "@/components/organisms/Header";
import ProfileForm from "@/components/organisms/ProfileForm";

const Profile = () => {
  return (
    <ThemedView style={{ flex: 1 }}>
      <Header bgType="background" type="profile" />
      <ProfileForm />
    </ThemedView>
  );
};

export default Profile;
