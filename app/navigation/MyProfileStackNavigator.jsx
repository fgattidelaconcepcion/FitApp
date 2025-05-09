import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyProfile from '../screens/MyProfile';
import ImageSelector from '../screens/ImageSelector';
import { StyleSheet } from 'react-native'; 
import ListAddress from '../screens/ListAddress';
import LocationSelector from '../screens/LocationSelector';


const Stack = createNativeStackNavigator();

const MyProfileStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MyProfile"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MyProfile" component={MyProfile} />
      <Stack.Screen name="ImageSelector" component={ImageSelector} />
      <Stack.Screen name="List Address" component={ListAddress} />
      <Stack.Screen name="Location Selector" component={LocationSelector} />
    </Stack.Navigator>
  );
};

export default MyProfileStackNavigator;

const styles = StyleSheet.create({});