import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import BottomTabNavigator from './BottomTabNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import { useDB } from '../hooks/useDB';
import { useSelector, useDispatch } from 'react-redux'; // Importa useDispatch
import { setUser } from '../features/user/userSlice';

const StackNavigator = () => {
  const { user } = useSelector(state => state.auth.value);
  const { getSession } = useDB();
  const dispatch = useDispatch(); // Usa useDispatch para obtener la función dispatch

  useEffect(() => {
    (async () => {
      try {
        const response = await getSession();
        if (response) {
          const userData = response; // Cambié el nombre de la variable para evitar confusiones
          dispatch(
            setUser({
              email: userData.email,
              localId: userData.localId,
              idToken: userData.token,
            })
          );
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [user, dispatch]); // Agregué dispatch a las dependencias del useEffect

  return (
    <NavigationContainer>
      {!user ? <AuthStackNavigator /> : <BottomTabNavigator />}
    </NavigationContainer>
  );
};

export default StackNavigator;