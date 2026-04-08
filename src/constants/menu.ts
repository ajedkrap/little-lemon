import Bruschetta from "@/assets/images/little-lemon/bruschetta.png";
import GreekSalad from "@/assets/images/little-lemon/greek-salad.png";
import GrilledFish from "@/assets/images/little-lemon/grilled-fish.png";
import LemonDessert from "@/assets/images/little-lemon/lemon-dessert.png";
import Pasta from "@/assets/images/little-lemon/pasta.png";

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  type: string;
  image: number;
  price: string;
}

export const MENU = [
  {
    id: 1,
    name: "Greek Salad",
    description:
      "The famous Greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.",
    type: "Starters",
    image: GreekSalad,
    price: "12.99",
  },
  {
    id: 2,
    name: "Bruschetta",
    description:
      "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.",
    type: "Starters",
    image: Bruschetta,
    price: "7.99",
  },
  {
    id: 3,
    name: "Grilled Fish",
    description:
      "Barbequed catch of the day, with red onion, crisp capers, chive creme fraiche and lemon.",
    type: "Mains",
    image: GrilledFish,
    price: "20.00",
  },
  {
    id: 4,
    name: "Pasta",
    description:
      "penne with fried aubergine, tomato sauce, fresh chilli, garlic, basil, and salted ricotta",
    type: "Mains",
    image: Pasta,
    price: "18.99",
  },
  {
    id: 5,
    name: "Lemon Desser",
    description:
      "Light and fluffy traditional homemards Italian Lemon and ricotta cake",
    type: "Desserts",
    image: LemonDessert,
    price: "6.99",
  },
];

export const FOOD_TYPES = ["starters", "mains", "desserts", "drinks"];
