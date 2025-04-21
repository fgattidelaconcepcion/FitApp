import { StyleSheet } from 'react-native';
import React from 'react';
import CartTemp from '../screens/CartTemp';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const CartStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Desactiva el header de la pila
      }}
    >
      <Stack.Screen name="Cart" component={CartTemp} />
    </Stack.Navigator>
  );
};

export default CartStackNavigator;

const styles = StyleSheet.create({});
