import React, { Component } from 'react'
import {Button, StyleSheet, Text, View,TextInput } from 'react-native';
import {connect} from 'react-redux'
import { bindActionCreators} from 'redux'
import {loadSubToken} from '../Actions/SigningInActions'
import firebase from 'firebase'
import GoogleFit, { Scopes } from 'react-native-google-fit' 
const logOut = ()=>{
  firebase.auth().signOut()
}
export class Main extends Component {
   componentDidMount() {
     loadSubToken()
    
 
     }
    render() {
        return (
            <View>
            <Text>
              WElcome bod
              <Button
              title='LogOut'
              onPress={()=>logOut()}/>
            </Text>
          </View>
        )
    }
}
const mapStateToProps = (store) => ({
    cuurentUser:store.signIn.currentUserToken
})
const mapDistpathToProps = (dispatch) => bindActionCreators(loadSubToken,dispatch)

export default connect(mapStateToProps,mapDistpathToProps)(Main);
