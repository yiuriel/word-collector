import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../context/ThemeContext";
import { useSavings } from "../context/SavingsContext";

export const SettingsScreen = () => {
  const { mode, colorScheme, colors, toggleTheme, setColorScheme } = useTheme();
  const { clearAllData } = useSavings();

  const colorSchemes = [
    { name: "green", icon: "leaf" },
    { name: "blue", icon: "water" },
    { name: "purple", icon: "gem" },
    { name: "orange", icon: "sun" },
    { name: "pink", icon: "heart" },
    { name: "red", icon: "fire" },
    { name: "teal", icon: "droplet" },
    { name: "indigo", icon: "moon" },
  ] as const;

  const handleClearData = () => {
    Alert.alert(
      "Clear All Data",
      "Are you sure you want to clear all data? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            try {
              await clearAllData();
              Alert.alert("Success", "All data has been cleared successfully");
            } catch (error) {
              Alert.alert("Error", "Failed to clear data");
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Theme Mode
        </Text>
        <TouchableOpacity
          style={[styles.option, { borderColor: colors.border }]}
          onPress={toggleTheme}
        >
          <Text style={[styles.optionText, { color: colors.text }]}>
            {mode === "light" ? "Light Mode" : "Dark Mode"}
          </Text>
          <FontAwesome6
            name={mode === "light" ? "sun" : "moon"}
            size={20}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Color Scheme
        </Text>
        {colorSchemes.map(({ name, icon }) => (
          <TouchableOpacity
            key={name}
            style={[
              styles.option,
              { borderColor: colors.border },
              colorScheme === name && styles.selectedOption,
            ]}
            onPress={() => setColorScheme(name)}
          >
            <Text
              style={[
                styles.optionText,
                { color: colors.text },
                colorScheme === name && { color: colors.primary },
              ]}
            >
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Text>
            <FontAwesome6
              name={icon}
              size={20}
              color={
                colorScheme === name ? colors.primary : colors.textSecondary
              }
            />
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Data Management
        </Text>
        <TouchableOpacity
          style={[styles.option, { borderColor: colors.border }]}
          onPress={handleClearData}
        >
          <Text style={[styles.optionText, { color: "#ff3b30" }]}>
            Clear All Data
          </Text>
          <FontAwesome6 name="trash-can" size={20} color={"#ff3b30"} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  section: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedOption: {
    borderWidth: 2,
  },
  optionText: {
    fontSize: 16,
  },
});
