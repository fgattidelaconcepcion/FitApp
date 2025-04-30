import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { colors } from '../global/colors'

const Header = ({route}) => {
  const { height, width } = useWindowDimensions();
  const headerText = typeof route.name === 'string' ? route.name : 'Título Genérico'; // Aseguramos que headerText sea siempre string

  return (
    <View style={styles.container}>
      <Text style={width > 360 ? styles.text : styles.textSm}>{headerText}</Text>
    </View>
  )
}


export default Header

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontFamily :'Josefin',
    color: colors.text,
    fontSize: 25,

  }
})