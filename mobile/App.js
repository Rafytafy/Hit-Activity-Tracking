import { StatusBar } from 'expo-status-bar';
import React ,{Component} from 'react';
import { Text, View } from 'react-native';


import  firebase from 'firebase/app';
const firebaseConfig = {
  apiKey: "AIzaSyDk_hueTUcYP2ULeS2dIIZwiKHybq8esC0",
  authDomain: "hit-activity-tracking.firebaseapp.com",
  databaseURL: "https://hit-activity-tracking-default-rtdb.firebaseio.com",
  projectId: "hit-activity-tracking",
  storageBucket: "hit-activity-tracking.appspot.com",
  messagingSenderId: "828801400123",
  appId: "1:828801400123:web:46e50140b14c24be6fcb1e"
};



import Landing from './components/Landing';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Main from './Components/Main'
import styles from './styles'

import {Provider} from 'react-redux'
import {createStore,applyMiddleware} from 'redux'
import rootReducer from './Reducers/Index'
import thunk from 'redux-thunk'
const store = createStore(rootReducer,applyMiddleware(thunk));


import {NavigationContainer } from'@react-navigation/native';
import {createStackNavigator } from'@react-navigation/stack'; 


if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}
const Stack = createStackNavigator();



export class App extends Component {
  constructor(props) {
    super()
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }
  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Loading</Text>
        </View>
      )
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return (
      <Provider store={store}>
        <NavigationContainer >
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={Main} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App




