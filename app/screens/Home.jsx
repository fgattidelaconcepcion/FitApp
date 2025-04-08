import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import categories from '../data/categories.json'
import Categories from '../components/Categories'
import { colors } from '../global/colors'

const Home = ({ setCategorySelected }) => {
  return (
    <View style={styles.flatListContainer}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={categories.sort()}
        renderItem={({ item }) => 
          <Categories category={item} selectCategory = {setCategorySelected} />}
        keyExtractor={(itemElement) => itemElement}
      />
    </View>
  );
};

export default Home

const styles = StyleSheet.create({
  flatListContainer: {
    width: "100%",
    backgroundColor: colors.background,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  }
})