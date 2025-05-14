import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import BottomTabNavigator from './BottomTabNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import { useDB } from '../hooks/useDB';
import { useSelector, useDispatch } from 'react-redux'; 
import { setUser } from '../features/user/userSlice';

const StackNavigator = () => {
  const dispatch = useDispatch(); 
  const { user } = useSelector(state => state.auth.value);
  const { getSession } = useDB();
  
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const session = await getSession();
        if (session) {
          console.log("Session retrieved from DB:", session);
          dispatch(
            setUser({
              user: session.email,
              token: session.token,
              localId: session.localId,
            })
          );
        } else {
          console.log("No session found in DB");
        }
      } catch (err) {
        console.log("Error retrieving session:", err);
      }
    };
  
    restoreSession();
  }, []); 
  return (
    <NavigationContainer>
      {!user ? <AuthStackNavigator /> : <BottomTabNavigator />}
    </NavigationContainer>
  );
};

export default StackNavigator;
