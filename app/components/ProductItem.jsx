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
    navigation.navigate("ItemDetail", { id: product.id }); // Navega pasando el id
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
    flexDirection: "row",
    height: 120,
    width: 300,
    margin: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.background,
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pressable: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  imageContainer: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  textCategory: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "500",
  },
});
