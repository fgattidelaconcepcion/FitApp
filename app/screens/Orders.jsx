import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import OrderItem from '../components/OrderItem'
import { useSelector } from 'react-redux'
import { useGetOrdersQuery } from '../services/shopServices'

const Orders= () => {
  const {localId} = useSelector( state => state.auth.value)
  const {data: orders, isSuccess} = useGetOrdersQuery()
  const [ordersFiltered, setOrdersFiltered] = useState([]) // Inicializa como un array vacío

  useEffect(() => {
    if (isSuccess && orders) {
      const responseTransformed = Object.entries(orders).map(([key, value]) => ({
        id: key, // Usa la clave de Firebase como ID único
        ...value,
      }));
      const ordersToFilter = responseTransformed.filter(
        (order) => order.user === localId
      );
      setOrdersFiltered(ordersToFilter);
    }
  }, [orders, isSuccess, localId]);

  return (
    <View>
      <FlatList
        data={ordersFiltered}
        keyExtractor={(item) => item.id} // Usa el ID único del item como key
        renderItem={({ item }) => (
          <OrderItem order={item} />
        )}
      />
    </View>
  );
}

export default Orders

const styles = StyleSheet.create({})