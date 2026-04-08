import { ImageSource } from "expo-image";
import { ImageSourcePropType } from "react-native";

export type UserFormData = {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phone?: string | null;
  image?: ImageSource | number | null;
};

export type MenuItem = {
  id: number;
  name: string;
  description: string;
  type: string;
  image: ImageSourcePropType;
  price: string;
};

export type NotificationData = {
  orderStatuses?: boolean | null;
  passwordChanges?: boolean | null;
  specialOffers?: boolean | null;
  newsletter?: boolean | null;
};
