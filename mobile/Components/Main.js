import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import firebase from 'firebase'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import ProgramScreen from './Main/programComponents/Program'
import SearchScreen from './Main/Search'
import ProfileScreen from './Main/Profile'

import { NavigationContainer } from '@react-navigation/native'
import {loadSubToken,loadProfileData,getWeights,getSessions} from '../Actions/SubscriberActions'
const Tab=createBottomTabNavigator();



export class Main extends Component{
  
  componentDidMount(){
   this.props.loadSubToken();
   this.props.loadProfileData();
   setTimeout(() => {
    this.props.getWeights(this.props.profileData._id);
    this.props.getSessions(this.props.profileData._id)
   }, 1000);
  
  }
  render() {
      return(
          
          <Tab.Navigator initialRouteName="Exercises">
             <Tab.Screen name="Program" component={ProgramScreen} 
              options={{ 
                tabBarIcon:({color, size})=>(
                    <MaterialCommunityIcons name="dumbbell" color={color} size={26}/>
                  ),
              }}/>
              <Tab.Screen name="Search" component={SearchScreen} 
              options={{ headerShown: false ,
                tabBarIcon:({color, size})=>(
                    <MaterialCommunityIcons name="magnify" color={color} size={26}/>
                  ),
              }}/>
              <Tab.Screen name="Profile" component={ProfileScreen} 
               listeners={({ navigation }) => ({
                tabPress: event => {
                    event.preventDefault();
                    navigation.navigate("Profile", {uid: firebase.auth().currentUser.uid})
                }})}
              options={{ headerShown: false ,
                tabBarIcon:({color, size})=>(
                    <MaterialCommunityIcons name="account-circle" color={color} size={26}/>
                  ),
              }}/>
            
          </Tab.Navigator>
          
         
          
      )
  } 

}

const mapStateToProps=(store)=> ({
  currentUser: store.subscriber.currentUser,
  profileData: store.subscriber.profileData
  
})
const mapDispatchProps=(dispatch)=> bindActionCreators({loadSubToken,loadProfileData,getWeights,getSessions},dispatch)
 

export default connect(mapStateToProps, mapDispatchProps) (Main);
