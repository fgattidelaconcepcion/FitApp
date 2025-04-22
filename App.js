// App.js
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, Platform, StatusBar } from 'react-native';
import StackNavigator from './app/navigation/StackNavigator';
import { useFonts } from 'expo-font';
import { colors } from './app/global/colors';
import store from './app/store';
import { Provider } from "react-redux";

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Josefin: require('./assets/JosefinSlab-BoldItalic.ttf'),
    JosefinSans: require('./assets/JosefinSans-Regular.ttf'),
  });
  

  if (fontError) return <Text>Error cargando fuente</Text>;
  if (!fontsLoaded) return null;
  
  return (
    <NavigationContainer>
  <SafeAreaView style={styles.container}>
    <Provider store={store}>
    <StackNavigator />
    </Provider>
  </SafeAreaView>
</NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
     marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, 
    backgroundColor: colors.background
  },
});