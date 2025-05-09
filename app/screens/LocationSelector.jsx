import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import MapPreview from '../components/MapPreview';
import { usePostLocationMutation } from '../services/shopServices';
import { useSelector } from 'react-redux';
import { colors } from '../global/colors';
import { googleMapsApiKey } from '../databases/googleMaps'

const LocationSelector = () => {
    const [location, setLocation] = useState({latitude: '', longitude: ''});
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');

    const [triggerPostUserLocation, result] = usePostLocationMutation();
    const { localId } = useSelector(state => state.auth.value)

    const onConfirmAddress = () => {
        const date = new Date()
        triggerPostUserLocation({
            location: {
                latitude: location.latitude,
                longitude: location.longitude,
                address: address,
                updateAt: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
            },
            localId: localId
        })
    }

    useEffect(()=>{
        // IIFE 
        (async () =>{
            try {
                // perdir permiso de localizacion
                let {status} = await Location.requestForegroundPermissionsAsync()
                // comprobar si usuario da permiso
                if(status === "granted"){
                    let location = await Location.getCurrentPositionAsync({})
                    console.log(location)
                    setLocation({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude
                    })
                }
                // establecer la geolocalizacion con latitud y logitud
            } catch(error){
                console.log(error)
            }
        })()
    }, [])

    useEffect(()=>{
        ( async ()=>{
            try {
                if(location.latitude) {
                    const url_reverse_geocode = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${googleMapsApiKey}`;
                    const response = await fetch(url_reverse_geocode);
                    const data = await response.json()
                    setAddress(data.results[0].formatted_address);
                }
            }catch(error){
                console.log(error)
            }
        })()
    }, [location])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>My Address</Text>
      {/* Flatlist con las directions */}
      {location ? (
        <>
          <Text style={styles.text}>
            Lat: {location.latitude}, long: {location.longitude}.
          </Text>
          <MapPreview location={location} />
          <Text style={styles.address}>Formatted address: {address}</Text>
          <Button onPress={onConfirmAddress} title="Confirm address" />
        </>
      ) : (
        <>
          <View style={styles.noLocationContainer}>
            <Text>{error}</Text>
          </View>
        </>
      )}
    </View>
  );
}

export default LocationSelector

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  text: {
    paddingTop: 20,
    fontFamily: "Josefin",
    fontSize: 16,
  },
  noLocationContainer: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: colors.primary,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  address: {
    padding: 10,
    fontSize: 16,
  },
});