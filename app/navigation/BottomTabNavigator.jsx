import { StyleSheet, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStackNavigator from './HomeStackNavigator';
import CartStackNavigator from './CartStackNavigator';
import OrderStackNavigator from './OrderStackNavigator';
import MyProfileStackNavigator from './MyProfileStackNavigator';
import Header from '../components/Header';
import { colors } from '../global/colors';
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Fontisto from '@expo/vector-icons/Fontisto';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: () => <Header route={route} />,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <FontAwesome5 name="store" size={24} color={focused ? "black" : colors.primary} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <AntDesign name="shoppingcart" size={24} color={focused ? "black" : colors.primary} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrderStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <FontAwesome6 name="clipboard-list" size={24} color={focused ? "black" : colors.primary} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="MyProfile"
        component={MyProfileStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Fontisto name="person" size={24} color="black" />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.primary,
    shadowColor: 'black',
    elevation: 4,
    borderRadius: 15,
    height: 80,
  },
});
