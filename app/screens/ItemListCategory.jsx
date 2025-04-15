import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import products from "../data/products.json"
import Search from '../components/Search'
import ProductItem from '../components/ProductItem'

const ItemListCategory = ({ navigation, route }) => {
  const { category } = route.params;
  const [keyWord, setKeyword] = useState("");
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const regex = /\d/;
    if (regex.test(keyWord)) {
      setError("No se permiten números");
      return;
    }

    const productsPrefiltered = products.filter(p => p.category === category);
    const productsFilter = productsPrefiltered.filter(p =>
      p.title.toLowerCase().includes(keyWord.toLowerCase())
    );

    setProductsFiltered(productsFilter);
    setError("");
  }, [keyWord, category]);

  return (
    <View>
      <Search
        error={error}
        onSearch={setKeyword}
        goBack={() => navigation.goBack()}
      />
      <FlatList
        data={productsFiltered}
        renderItem={({ item }) => (
          <ProductItem product={item} setItemIdSelected={(id) => navigation.navigate('ItemDetail', { id })} />
        )}
        keyExtractor={(producto) => producto.id}
      />
    </View>
  );
};


export default ItemListCategory

const styles = StyleSheet.create({})