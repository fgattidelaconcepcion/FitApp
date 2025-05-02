import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
//import categories from '../data/categories.json';
import Categories from '../components/Categories';
import { colors } from '../global/colors';
//import Counter from "../components/Counter";
import { useGetCategoriesQuery } from "../services/shopServices";

const Home = ({ navigation }) => {
  const {data: categories, error, isLoading} = useGetCategoriesQuery()
  return (
    <View style={styles.flatListContainer}>
     {/* <Counter /> */} 
      <FlatList
        showsVerticalScrollIndicator={false}
        data={categories}
        renderItem={({ item }) => (
          <Categories 
            category={item} 
            selectCategory={(cat) =>
              navigation.navigate("CategoryDetail", { category: cat })
            }
          />
        )}
        keyExtractor={(itemElement) => itemElement}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  flatListContainer: {
    width: "100%",
    backgroundColor: colors.primary,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
