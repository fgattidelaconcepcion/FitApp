import { StyleSheet, View } from 'react-native';
import { colors } from './app/global/colors';
import Header from './app/components/Header';
import Home from './app/screens/Home';
import ItemListCategory from './app/screens/ItemListCategory';
import ItemDetail from './app/screens/ItemDetail.jsx';


export default function App() {

  return (
    <View style={styles.container}>
      <Header title={"FitApp"} />
      <Home />
      <ItemListCategory />
      <ItemDetail />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});