import { MenuRow } from "@/data/database";
import { StyleSheet, View } from "react-native";
import ImageView from "../atoms/ImageView";
import ThemedText from "../atoms/ThemedText";

export interface FoodCardProps {
  food: MenuRow;
}

const FoodCard: React.FC<FoodCardProps> = ({ food }) => {
  const getURL = (type: string) => {
    return `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/thumbnails/${type}?raw=true`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textGroup}>
          <ThemedText type="cardTitle">{food.name}</ThemedText>
          <ThemedText type="small" numberOfLines={2} ellipsizeMode="tail">
            {food.description}
          </ThemedText>
        </View>
        <ThemedText type="highlight">{"$" + food.price}</ThemedText>
      </View>
      <View>
        <ImageView
          source={{ uri: getURL(food.image.toString()) }}
          containerStyle={styles.imageContainer}
          style={styles.image}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  textGroup: {
    gap: 4,
  },
  imageContainer: {
    width: 100,
    height: 100,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
  },
});

export default FoodCard;
