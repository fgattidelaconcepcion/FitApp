import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CartItem from '../components/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { removeCartItem, clearCart } from '../features/cart/cartSlice';
import { usePostOrderMutation } from '../services/shopServices';
import { colors } from '../global/colors';

const CartScreen = () => {
  const dispatch = useDispatch();
  const { items: CartData, total } = useSelector((state) => state.cart.value);
  const { localId } = useSelector((state) => state.auth.value);
  const [triggerPostOrder, result] = usePostOrderMutation();

  const handleRemoveItem = (id) => {
    dispatch(removeCartItem(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const onConfirmOrder = () => {
    const timestamp = new Date().getTime(); // Obtiene el timestamp actual
    triggerPostOrder({ items: CartData, user: localId, total, createdAt: timestamp }); // Incluye createdAt
    dispatch(clearCart()); // Limpia el carrito después de la orden
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={CartData}
        keyExtractor={(product) => product.id.toString()}
        renderItem={({ item }) => (
          <CartItem cartItem={item} onRemove={handleRemoveItem} />
        )}
      />
      <View style={styles.totalContainer}>
        <Pressable onPress={onConfirmOrder}>
          <Text style={styles.totalText}>Confirmar compra: ${total}</Text>
        </Pressable>
      </View>
      <View style={styles.totalContainer}>
        <Pressable onPress={handleClearCart}>
          <Text style={styles.totalText}>Vaciar carrito - Total a pagar: ${total}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 100,
  },
  totalContainer: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
  },
  totalText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
});