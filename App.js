import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { colors } from './app/global/colors';
import Header from './app/components/Header';
import Home from './app/screens/Home';
import ItemListCategory from './app/screens/ItemListCategory';
import ItemDetail from './app/screens/ItemDetail.jsx';
import { useFonts } from 'expo-font';
import { useState } from 'react';


export default function App() {
 
  const [categorySelected, setCategorySelected] = useState("");
  const [itemIdSelected, setItemIdSelected] = useState("");
  const [fontsLoaded, fontError] = useFonts({
    Josefin: require('./assets/JosefinSlab-BoldItalic.ttf'),
  })

  if(!fontsLoaded || fontError) return null;

  if (fontsLoaded && !fontError) {
  return (
    <SafeAreaView style={styles.container}>
      <Header title={"FitApp"} />
      {!categorySelected ? (
        <Home setCategorySelected={setCategorySelected} />
      ) : !itemIdSelected ? (
        <ItemListCategory
          categorySelected={categorySelected}
          setCategorySelected={setCategorySelected}
          setItemIdSelected={setItemIdSelected}
        />
      ) : (
        <ItemDetail 
          idSelected={itemIdSelected}
          setProductSelected={setItemIdSelected}
        />
      )}
    </SafeAreaView>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
     marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, 
    alignItems: 'center',
    backgroundColor: colors.background
  },
});