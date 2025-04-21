import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrdersTemp from '../screens/OrdersTemp';

const Stack = createNativeStackNavigator();

const OrderStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Orders" component={OrdersTemp} />
    </Stack.Navigator>
  );
};

export default OrderStackNavigator;
