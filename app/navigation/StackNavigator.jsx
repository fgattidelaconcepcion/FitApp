import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './BottomTabNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import { useSelector } from 'react-redux';

const StackNavigator = () => {
  const {user} = useSelector(state => state.auth.value)
  return (
    <NavigationContainer> 
      {!user ? <AuthStackNavigator /> : <BottomTabNavigator />}
      </NavigationContainer>
  )
  ;
}

export default StackNavigator