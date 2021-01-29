import React, { Component } from 'react'
import {Button, StyleSheet, Text, View,TextInput } from 'react-native';
import {connect} from 'react-redux'
import { bindActionCreators} from 'redux'
import {loadSubToken} from '../Actions/SigningInActions'
export class Main extends Component {
   componentDidMount() {
     this.props.loadSubToken()
  

   }
    render() {
        return (
            <View>
            <Text>
              WElcome bod
              
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
