import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Orders from '../screens/Orders';

const Stack = createNativeStackNavigator();

const OrderStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Ordenes" component={Orders} />
    </Stack.Navigator>
  );
};

export default OrderStackNavigator;
