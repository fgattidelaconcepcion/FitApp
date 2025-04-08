import { StyleSheet, Text, View, Image,Pressable } from "react-native";
import React from 'react'
import Card from './Card'
import { colors } from "../global/colors";

const Categories = ({ category="", selectCategory = ()=> {} }) => {
  return (
    <Card style={{ marginVertical: 10, marginHorizontal: 10 }}>
      <Pressable onPress={() => selectCategory(category)}>
        <Text style={styles.text}>{category}</Text>
      </Pressable>
    </Card>
  );
};

export default Categories

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: colors.text,
  }
})