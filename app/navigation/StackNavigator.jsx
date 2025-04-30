
import BottomTabNavigator from './BottomTabNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import { useSelector } from 'react-redux';

const StackNavigator = () => {
  const {user} = useSelector(state => state.auth.value)
  return 
      {!user ? <AuthStackNavigator /> : <BottomTabNavigator />}
  ;
}

export default StackNavigator