import { StyleSheet, Text, View, Image } from "react-native";
import React from 'react'
import Card from './Card'
import { colors } from "../global/colors";

const Categories = ({category}) => {
  return (
    <Card>
      <Text style={styles.text} >{category}</Text>
    </Card>
  )
}

export default Categories

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: colors.text,
  }
})