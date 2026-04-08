import { useAuth } from "@/context/AuthContext";
import {
  getNotifications,
  getUser,
  saveNotifications,
  saveUser,
} from "@/data/database";
import { useTheme } from "@/hooks/use-theme";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { NotificationData, UserFormData } from "@/utils/types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import ThemedText from "../atoms/ThemedText";
import ThemedView from "../atoms/ThemedView";
import Checkbox from "../molecules/Checkbox";
import Field from "../molecules/Field";
import FieldAvatar from "../molecules/FieldAvatar";

const ProfileForm = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useTheme();
  const { resetOnboarding } = useAuth();

  const [form, setForm] = useState<UserFormData>({
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    image: null,
  });

  const [notif, setNotif] = useState<NotificationData>({
    orderStatuses: false,
    passwordChanges: false,
    specialOffers: false,
    newsletter: false,
  });

  const getUserData = async () => {
    const user = await getUser();
    if (user) setForm(user);
  };

  const getNotificationData = async () => {
    const data = await getNotifications();
    setNotif(data);
  };

  useEffect(() => {
    getUserData();
    getNotificationData();
  }, []);

  const onDiscardChanges = () => {
    getUserData();
    getNotificationData();
  };

  const onSaveChanges = async () => {
    await saveUser(form);
    await saveNotifications(notif);
    navigation.pop();
  };

  const handleChangeText = (key: string) => (text: string) => {
    setForm({ ...form, [key]: text && text !== "" ? text : null });
  };

  const handleChangeNotification = (key: string) => (value: boolean) => {
    setNotif({ ...notif, [key]: value });
  };

  const handleLogOut = () => {
    resetOnboarding();
  };

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.scrollViewContent}
    >
      <View
        style={[styles.container, { borderColor: theme.backgroundElement }]}
      >
        <View>
          <ThemedText type="cardTitle" style={styles.sectionTitle}>
            Personal Information
          </ThemedText>
          <FieldAvatar form={form} setForm={setForm} style={styles.avatar} />
          <Field
            value={form.firstName as string}
            labelType="small"
            onChangeText={handleChangeText("firstName")}
            label="First Name"
            placeholder="Enter your first name"
            keyboardType="default"
            autoComplete="name"
            autoCorrect={false}
          />
          <Field
            value={form.lastName as string}
            labelType="small"
            onChangeText={handleChangeText("lastName")}
            label="Last Name"
            placeholder="Enter your last name"
            keyboardType="default"
            autoComplete="name"
            autoCorrect={false}
          />
          <Field
            value={form.email as string}
            labelType="small"
            onChangeText={handleChangeText("email")}
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            autoComplete="email"
            autoCorrect={false}
          />
          <Field
            value={form.phone as string}
            labelType="small"
            onChangeText={handleChangeText("phone")}
            label="Phone"
            placeholder="Enter your phone"
            keyboardType="numeric"
            autoComplete="tel"
            autoCorrect={false}
          />
        </View>
        <View>
          <ThemedText type="cardTitle" style={styles.sectionTitle}>
            Email Notifications
          </ThemedText>
          <View style={styles.checkboxesContainer}>
            <Checkbox
              label="Order Statuses"
              value={notif.orderStatuses as boolean}
              onChange={handleChangeNotification("orderStatuses")}
            />
            <Checkbox
              label="Password Changes"
              value={notif.passwordChanges as boolean}
              onChange={handleChangeNotification("passwordChanges")}
            />
            <Checkbox
              label="Special Offers"
              value={notif.specialOffers as boolean}
              onChange={handleChangeNotification("specialOffers")}
            />
            <Checkbox
              label="Newsletter"
              value={notif.newsletter as boolean}
              onChange={handleChangeNotification("newsletter")}
            />
          </View>
        </View>
        <View style={styles.actionContainer}>
          <TouchableOpacity onPress={handleLogOut}>
            <ThemedView
              style={[
                styles.logoutButton,
                {
                  backgroundColor: theme.accent,
                  borderColor: theme.primary,
                },
              ]}
            >
              <ThemedText style={styles.logoutText}>Log out</ThemedText>
            </ThemedView>
          </TouchableOpacity>
          <View style={styles.bottomRow}>
            <TouchableOpacity onPress={onDiscardChanges}>
              <View
                style={[
                  styles.discardButton,
                  {
                    backgroundColor: theme.background,
                    borderColor: theme.primary,
                  },
                ]}
              >
                <ThemedText themeColor="textSecondary" type="cardTitle">
                  Discard Changes
                </ThemedText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onSaveChanges}>
              <View
                style={[
                  styles.saveButton,
                  {
                    backgroundColor: theme.primary,
                    borderColor: theme.primary,
                  },
                ]}
              >
                <ThemedText themeColor="background" type="cardTitle">
                  Save Changes
                </ThemedText>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  scrollViewContent: {
    padding: 8,
    paddingBottom: 0,
  },
  container: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  avatar: {
    marginBottom: 12,
  },
  checkboxesContainer: {
    gap: 10,
  },
  actionContainer: {
    gap: 36,
    marginVertical: 24,
  },
  logoutButton: {
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  discardButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 2,
    borderRadius: 8,
  },
  saveButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 2,
    borderRadius: 8,
  },
});

export default ProfileForm;
