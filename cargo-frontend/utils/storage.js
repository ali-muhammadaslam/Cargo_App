import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const storage = {
  setItem: async (key, value) => {
    const stringValue = JSON.stringify(value);
    if (Platform.OS === "web") {
      localStorage.setItem(key, stringValue);
    } else {
      await AsyncStorage.setItem(key, stringValue);
    }
  },
  getItem: async (key) => {
    const raw =
      Platform.OS === "web"
        ? localStorage.getItem(key)
        : await AsyncStorage.getItem(key);

    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return raw; // fallback if it's just a string
    }
  },
  removeItem: async (key) => {
    if (Platform.OS === "web") {
      localStorage.removeItem(key);
    } else {
      await AsyncStorage.removeItem(key);
    }
  },
};
