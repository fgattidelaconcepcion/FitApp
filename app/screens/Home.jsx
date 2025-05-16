import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, Animated } from 'react-native';
import Categories from '../components/Categories';
import { colors } from '../global/colors';
import { useGetCategoriesQuery } from '../services/shopServices';

const Home = ({ navigation }) => {
  const { data: categories, error, isLoading } = useGetCategoriesQuery();
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [categories]);

  return (
    <View style={styles.flatListContainer}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={categories}
          renderItem={({ item }) => (
            <Categories
              category={item}
              selectCategory={(cat) =>
                navigation.navigate('CategoryDetail', { category: cat })
              }
            />
          )}
          keyExtractor={(itemElement) => itemElement}
        />
      </Animated.View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  flatListContainer: {
    width: '100%',
    backgroundColor: colors.primary,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
