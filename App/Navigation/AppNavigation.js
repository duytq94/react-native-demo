import { StackNavigator } from 'react-navigation'

import LaunchScreen from '../Containers/LaunchScreen'
import MainScreen from '../Containers/Main/Main.Screen'
import SigninScreen from '../Containers/Signin/Signin.Screen'
import FetchScreen from '../Containers/Fetch/Fetch.Screen'
import StackScreen from '../Containers/Stack/Stack.Screen'
import TabScreen from '../Containers/Tab/Tab.Screen'
import ProfileScreen from '../Containers/Profile/Profile.Screen'
import LogicScreen from '../Containers/Logic/Logic.Screen'
import MapScreen from '../Containers/Map/Map.Screen'
import PhotoScreen from '../Containers/Photo/Photo.Screen'
import WebScreen from '../Containers/Web/Web.Screen'
import TimeScreen from '../Containers/Time/Time.Screen'
import FacebookScreen from '../Containers/Facebook/Facebook.Screen'
import ModalScreen from '../Containers/Modal/Modal.Screen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  LaunchScreen: { screen: LaunchScreen },
  MainScreen: { screen: MainScreen },
  SigninScreen: { screen: SigninScreen },
  FetchScreen: { screen: FetchScreen },
  StackScreen: { screen: StackScreen },
  TabScreen: { screen: TabScreen },
  ProfileScreen: { screen: ProfileScreen },
  LogicScreen: { screen: LogicScreen },
  MapScreen: { screen: MapScreen },
  PhotoScreen: { screen: PhotoScreen },
  WebScreen: { screen: WebScreen },
  TimeScreen: { screen: TimeScreen },
  FacebookScreen: { screen: FacebookScreen },
  ModalScreen: { screen: ModalScreen },
}, {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'MainScreen',
    navigationOptions: {
      headerStyle: styles.header
    }
  })

export default PrimaryNav