import { Image, StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetProfileImageQuery } from '../services/shopServices';
import { useDB } from '../hooks/useDB';
import { clearUser } from '../features/user/userSlice'


const MyProfile = ({navigation}) => {
const {imageCamera, localId} = useSelector(state => state.auth.value)
const {data: imageFromBase} = useGetProfileImageQuery(localId)
const { truncateSessionTable } = useDB();
const dispatch = useDispatch()

    const launchCamera = () => {
        navigation.navigate('ImageSelector'); 
        };

        const launchLocation = () => {
          navigation.navigate("List Address");
    };
    
    const signOut = async () => { 
      try {
        const response = await truncateSessionTable();
        console.log("Session table truncated", response)
        dispatch(clearUser())

      }catch(err){
        console.log(err)
      }
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
     <Button title="My address" onPress={launchLocation} /> 
     <Button title="Sign out" onPress={signOut} />
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