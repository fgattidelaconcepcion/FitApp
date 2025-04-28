import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CartItem from '../components/CartItem'
import { useSelector } from 'react-redux'

const CartScreen = () => {
  const {items : CartData , total} = useSelector((state)=>state.cart.value)
  return (
    <View style={styles.contaier}>
      <FlatList 
        data={CartData}
        keyExtractor={product => product.id}
        renderItem={({item})=>{
          return (
            <CartItem 
              cartItem={item}
            />
          )
        }}
      />
      <View style={styles.totalContainer}>
        <Pressable>
        <Text>Total a pagar: ${total}</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default CartScreen 

const styles = StyleSheet.create({
  contaier: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 100,
  },
  totalContainer: {
    height: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
})