import * as Location from 'expo-location';
import { AppleMaps, GoogleMaps } from "expo-maps";
import { useEffect, useState } from "react";
import { Platform, StyleSheet, Text } from "react-native";

export default function MapScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  if (errorMsg) {
    return <Text>{errorMsg}</Text>;
  }

  if (Platform.OS === "ios") {
    return (
      <AppleMaps.View 
        style={{ flex: 1 }}
        cameraPosition={location ? {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          zoom: 15
        } : undefined}
      />
    );
  } else if (Platform.OS === "android") {
    return (
      <GoogleMaps.View 
        style={{ flex: 1 }}
        cameraPosition={location ? {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          zoom: 15
        } : undefined}
      />
    );
  } else {
    return <Text>Maps are only available on Android and iOS</Text>;
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
