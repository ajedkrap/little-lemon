import ThemedView from "@/components/atoms/ThemedView";
import FoodList from "@/components/organisms/FoodList";
import Header from "@/components/organisms/Header";
import HomeHero from "@/components/organisms/HomeHero";
import { useTheme } from "@/hooks/use-theme";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

const Home = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useTheme();
  const [searchText, setSearchText] = useState("");

  return (
    <ThemedView style={styles.container} type="backgroundSelected">
      <Header
        bgType="background"
        type="profile"
        onPressRight={() => navigation.push("Profile")}
      />
      <ScrollView
        nestedScrollEnabled
        style={{ flex: 1, backgroundColor: theme.background }}
      >
        <HomeHero searchText={searchText} onSearchChange={setSearchText} />
        <FoodList searchText={searchText} />
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
