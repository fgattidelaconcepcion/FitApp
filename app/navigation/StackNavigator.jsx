import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import BottomTabNavigator from './BottomTabNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import { useDB } from '../hooks/useDB';
import { useSelector, useDispatch } from 'react-redux'; // Importa useDispatch
import { setUser } from '../features/user/userSlice';

const StackNavigator = () => {
  const dispatch = useDispatch(); // Usa useDispatch para obtener la función dispatch
  const { user } = useSelector(state => state.auth.value);
  const { getSession } = useDB();
  
  useEffect(()=>{
    (async ()=>{
      try {
        const response = await getSession()
        if(response){
          const user = response;
          dispatch(
            setUser({
              email: user.email,
              localId: user.localId,
              idToken: user.token
            }))         
        }
      } catch (err){
        console.log(err)
      }
    })()
  }, [user])

  return (
    <NavigationContainer>
      {!user ? <AuthStackNavigator /> : <BottomTabNavigator />}
    </NavigationContainer>
  );
};

export default StackNavigator;