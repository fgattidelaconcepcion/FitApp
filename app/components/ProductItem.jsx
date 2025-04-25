import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Card from "./Card";
import { colors } from "../global/colors";

import { useDispatch } from "react-redux";
import { setIdSelected } from "../features/shop/shopSlice";
import { useNavigation } from "@react-navigation/native";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleNavigate = () => {
    dispatch(setIdSelected(product.id)); // Guarda el ID en Redux
    navigation.navigate("ItemDetail", { productId: product.id }); // Navega pasando productId
  };

  return (
    <Card style={styles.card}>
      <Pressable style={styles.pressable} onPress={handleNavigate}>
        <View style={styles.textContainer}>
          <Text style={styles.textCategory}>{product.title}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={{ uri: product.images[0] }}
          />
        </View>
      </Pressable>
    </Card>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
  pressable: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    padding: 10,
  },
  textCategory: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary,
  },
  imageContainer: {
    width: 100,
    height: 100,
    marginLeft: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});