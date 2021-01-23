import { StatusBar } from 'expo-status-bar';
import React ,{Component} from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

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

import {NavigationContainer } from'@react-navigation/native';
import {createStackNavigator } from'@react-navigation/stack';

import landing from './components/landing';
import login from './components/login';
import signUp from './components/signUp';
import styles from './styles'

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}
const Stack = createStackNavigator();



export class App extends Component {
  constructor(props){
    super(props);
    this.state={loaded:false}
  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState ({
          loggedIn:  false,
          loaded: true
        })
      }else{
      this.setState ({
        loggedIn:  true,
        loaded: true
        })
      }
    })
  }
  render() {
    const{loggedIn,loaded} = this.state
    if(!loaded){
      return(
        <View style={{flex:1,justifyContent:'center'}}>
          <Text>
            Loading
          </Text>
        </View>
      )
    }
    if(!loggedIn){
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName='landing'>
            <Stack.Screen name ='landing' component={landing}/>
            <Stack.Screen name ='login' component={login}/>
            <Stack.Screen name ='signUp' component={signUp}/>
          
          </Stack.Navigator>
        </NavigationContainer>
          );
      }
      if(loggedIn){
        return(
          <View>
            <Text>
              Welcome to The home page
              
            </Text>
          </View>
        )
      }
  }
}


export default App




