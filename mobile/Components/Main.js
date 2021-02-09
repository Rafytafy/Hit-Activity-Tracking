import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import ExerciseScreen from './Main/Exercise'
import SearchScreen from './Main/Search'
import ProfileScreen from './Main/Profile'
import { NavigationContainer } from '@react-navigation/native'
import {loadSubToken} from '../Actions/SubscriberActions'
const Tab=createBottomTabNavigator();



export class Main extends Component{
  componentDidMount(){
    loadSubToken()

  }
  render() {
      return(

          

          <Tab.Navigator initialRouteName="Feed">
             <Tab.Screen name="Exercises" component={ExerciseScreen} 
              options={{
                tabBarIcon:({color, size})=>(
                    <MaterialCommunityIcons name="basketball" color={color} size={26}/>
                  ),
              }}/>
              <Tab.Screen name="Search" component={SearchScreen} 
              options={{
                tabBarIcon:({color, size})=>(
                    <MaterialCommunityIcons name="magnify" color={color} size={26}/>
                  ),
              }}/>
              <Tab.Screen name="Profile" component={ProfileScreen} 
              options={{
                tabBarIcon:({color, size})=>(
                    <MaterialCommunityIcons name="account-circle" color={color} size={26}/>
                  ),
              }}/>
            
          </Tab.Navigator>
          
         
          
      )
  } 

}

const mapStateToProps=(store)=> ({
  currentUser: store.subscriber.currentUser
})
const mapDispatchProps=(dispatch)=>bindActionCreators({loadSubToken}, dispatch)

export default connect(mapStateToProps, mapDispatchProps) (Main);
