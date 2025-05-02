import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CartItem from '../components/CartItem'
import { useDispatch, useSelector } from 'react-redux'
import {removeCartItem, clearCart} from  '../features/cart/cartSlice';
import { colors } from '../global/colors'

const CartScreen = () => {
  const dispatch = useDispatch();
  const {items : CartData , total} = useSelector((state)=>state.cart.value)

  const handleRemoveItem = (id) => {
    dispatch(removeCartItem(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <View style={styles.contaier}>
      <FlatList 
        data={CartData}
        keyExtractor={product => product.id}
        renderItem={({item})=>{
          return (
            <CartItem 
              cartItem={item} onRemove={handleRemoveItem}
            />
          )
        }}
      />
      <View style={styles.totalContainer}>
        <Pressable onPress={handleClearCart}>
        <Text style={styles.totalText}>Vaciar carrito - Total a pagar: ${total}</Text>
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
  clearButton: {
    backgroundColor: colors.primary,
    padding : 12,
    borderRadius:8,
  },
  totalText:{
    color:colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  }
});