import {Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../global/colors';
import Entypo from "@expo/vector-icons/Entypo";

const CartItem = ({cartItem , onRemove}) => {
  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{cartItem.title}</Text>
        <Text style={styles.text2}>{cartItem.brand}</Text>
        <Text style={styles.text2}>{cartItem.price}</Text>
      </View> 
      <Pressable onPress={() => onRemove(cartItem.id)}>
        <Entypo name="trash" size={30} color="black" />
      </Pressable>
    </View>
  );
}

export default CartItem

const styles = StyleSheet.create({
    card: {
        height: 100,
        backgroundColor: colors.background,
        padding: 10,
        margin: 10,
        borderRadius: 10,
        borderWidth: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    textContainer: {
        width: "70%",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    }, 
    text: {
        fontFamily: 'Josefin',
        fontSize: 20,
        color: colors.primary,
    },
    text2: {
        fontFamily: 'Josefin',
        fontSize: 16,
        color: colors.primary,
    }
})