import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View, StatusBar, Image, Text, TouchableOpacity, Modal } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react';
import { ActivityIndicator } from 'react-native';


export default function MapModal({
  isVisible,
  handleClose,
}) {

  const [address, setAddress] = useState('')

  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [isLoading, setIsLoading] = useState(false);

  const isButtonDisabled = useMemo(() => {
    return !location.latitude && !location.longitude
  }, [location])


  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return;
    }
    setIsLoading(true)
    let location = await Location.getCurrentPositionAsync({});
    setIsLoading(false)

    const { latitude, longitude } = location.coords;

    setLocation({
      latitude,
      longitude,
    });
    // reverseGeocode(latitude, longitude);
  }

  useEffect(() => {
    getLocation()
  }, [])


  const reverseGeocode = useCallback(async (lat, long) => {
    const latitude = lat || location.latitude;
    const longitude = long || location.longitude;

    const apiKey = 'IFuw708xHPX0QVj51T4NHjLaI7s8zF36';

    // Reverse geocoding with MapQuest
    const mapQuestUrl = `https://www.mapquestapi.com/geocoding/v1/reverse?key=${apiKey}&location=${latitude},${longitude}&includeRoadMetadata=true&includeNearestIntersection=true`;

    try {
      const mapQuestResponse = await fetch(mapQuestUrl);

      if (!mapQuestResponse.ok) {
        throw new Error(`MapQuest Geocoding failed with status: ${mapQuestResponse.status}`);
      }

      const mapQuestData = await mapQuestResponse.json();
      const mapQuestAddress = mapQuestData.results[0].locations[0];
      const {
        street,
        adminArea6,
        adminArea5,
        adminArea4,
        adminArea3,
        adminArea1,
        postalCode,
        displayLatLng,
      } = mapQuestAddress;
      const mapQuestAd = `${street} ${adminArea6}, ${adminArea5}, ${postalCode}`;
      setAddress(mapQuestAd.trim());
      handleClose(location, mapQuestAd.trim())
    } catch (error) {
      console.error("MapQuest Geocoding failed:", error);
    }
  }, [location]);


  const handleMapPress = (event) => {
    return
    const { coordinate } = event.nativeEvent;
    setLocation(coordinate);
    // reverseGeocode(coordinate.latitude, coordinate.longitude);
  };

  const updateAddress = async () => {
    // handleClose(location)
    reverseGeocode();
  }

  return (
    <Modal
      animationType="slide"
      visible={isVisible}
      onRequestClose={() => handleClose()}
    >
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: location?.latitude,
          longitude: location?.longitude,
          latitudeDelta: 0.0022,
          longitudeDelta: 0.0021,
        }}
        initialRegion={{
          latitude: 16.865293145502434,
          longitude: 75.81124970809975,
          latitudeDelta: 0.0422,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation
      // onPress={handleMapPress}
      >

        <Marker
          coordinate={{
            latitude: location?.latitude,
            longitude: location?.longitude,
          }}
          title="Your location"
          description="Marker Description"
        />
      </MapView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.CurrentLocation} onPress={getLocation} >
          <View>
            <Image
              source={require('@assets/Location.png')}
              style={{
                width: 25,
                height: 25,
                opacity: 0.6
              }}
            />
          </View>
          <View>
            <Text style={{
              fontSize: 16,
              fontStyle: 'normal',
              fontWeight: '600',
              lineHeight: 30,
              color: 'rgba(64, 64, 64, 1)'
            }}>Get current location</Text>
          </View>
        </TouchableOpacity>

        <View style={{ gap: 10 }}>
          <Text>Latitude: {location?.latitude || '---'}</Text>
          <Text>Longitude: {location?.longitude || '---'}</Text>
        </View>

        <TouchableOpacity
          onPress={updateAddress}
          style={{
            ...styles.Location_Done,
            opacity: isButtonDisabled ? 0.7 : 1,
          }}
          // disabled={isButtonDisabled || isLoading}
        >
          <Text
            style={{
              fontSize: 20,
              color: "rgba(255, 255, 255, 1)",
            }}
          >Set Location</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },

  map: {
    height: 500,
    width: "100%"
  },

  footer: {
    marginHorizontal: 20,
    gap: 20,
  },

  CurrentLocation: {
    flexDirection: "row",
    gap: 5,
    marginTop: 10,
    alignItems: "center"
  },

  Location_Done: {
    justifyContent: "center",
    backgroundColor: "#FF8C3D",
    height: 50,
    alignItems: "center",
    borderRadius: 10,
  },
});