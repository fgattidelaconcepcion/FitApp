import { Image, StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { useGetProfileImageQuery } from '../services/shopServices';

const MyProfile = ({navigation}) => {
const {imageCamera, localId} = useSelector(state => state.auth.value)
const {data: imageFromBase} = useGetProfileImageQuery(localId)
    const launchCamera = () => {
        navigation.navigate('ImageSelector'); // Corregido el nombre de la pantalla
    }
  return (
    <View style={styles.container}>
        {imageFromBase || imageCamera ?
        (
            <Image source={{uri:imageFromBase?.image || imageCamera}}
            style={styles.image}
            resizeMode='cover'
            />

        )
        :
        (
         <Image
            source={require('../../assets/images/imageDefault.png')}
            style={styles.image}
            resizeMode='cover'
          />
        )}

     <Button title ='Agregar foto de perfil' onPress={launchCamera}></Button> 
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});