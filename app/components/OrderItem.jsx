import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Feather from "@expo/vector-icons/Feather";
import { colors } from '../global/colors';

const OrderItem = ({order}) => {
  return (
    <View style={styles.card} onPress={() => {}}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{new Date(order.createdAt).toLocaleString()}</Text>
        <Text style={styles.text2}>{order.total}</Text>
      </View>
      <Feather name="search" size={30} color="black" />
    </View>
  );
}

export default OrderItem

const styles = StyleSheet.create({
    card: {
        height: 100,
        backgroundColor: colors.platinum,
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
        color: colors.teal400,
    },
    text2: {
        fontFamily: 'Josefin',
        fontSize: 16,
        color: colors.teal600,
    }
})