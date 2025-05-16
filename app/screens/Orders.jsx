import { FlatList, StyleSheet, View, Animated, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import OrderItem from '../components/OrderItem';
import { useSelector } from 'react-redux';
import { useGetOrdersQuery } from '../services/shopServices';

const Orders = () => {
  const { localId } = useSelector((state) => state.auth.value);
  const { data: orders, isSuccess, isLoading } = useGetOrdersQuery();
  const [ordersFiltered, setOrdersFiltered] = useState([]);

  useEffect(() => {
    if (isSuccess && orders) {
      const responseTransformed = Object.entries(orders).map(([key, value]) => ({
        id: key,
        ...value,
      }));
      const ordersToFilter = responseTransformed.filter(
        (order) => order.user === localId
      );
      setOrdersFiltered(ordersToFilter);
    }
  }, [orders, isSuccess, localId]);

  if (isLoading) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  return (
    <FlatList
      data={ordersFiltered}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => {
        const translateX = new Animated.Value(300); // Comienza fuera de la pantalla
        Animated.timing(translateX, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();

        return (
          <Animated.View style={{ transform: [{ translateX }] }}>
            <OrderItem order={item} />
          </Animated.View>
        );
      }}
    />
  );
};

export default Orders;

const styles = StyleSheet.create({});
