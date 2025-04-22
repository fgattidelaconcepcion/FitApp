import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";
import Card from "./Card";
import { colors } from "../global/colors";
import { useDispatch } from "react-redux";
import { setCategorySelected } from "../features/shop/shopSlice";
import { useNavigation } from '@react-navigation/native'; // Importa el hook

const Categories = ({ category }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation(); // Usa el hook para obtener el objeto navigation

  const handleNavigate = () => {
    dispatch(setCategorySelected(category));
    navigation.navigate('ItemListCategory', { category });
  };
  
  return (
    <Card style={{ marginVertical: 10, marginHorizontal: 10 }}>
      <Pressable onPress={handleNavigate}>
        <Text style={styles.text}>{category}</Text>
      </Pressable>
    </Card>
  );
};

export default Categories;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'JosefinSans',
    fontSize: 20,
    textAlign: 'center',
    color: colors.primary,
  }
});
