import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, Text } from "react-native";

export default function MapScreen() {
  return (
    <ThemedView style={styles.container}>
      <Text style={{ color: "#ffcc00" }}>This is the map screen</Text>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
