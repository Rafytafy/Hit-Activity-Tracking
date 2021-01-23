import React, { Component } from 'react'
import {Button, StyleSheet, Text, View,TextInput } from 'react-native';
import firebase from 'firebase';
export  class login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password:''
        }
        this.authLogin=this.authLogin.bind(this)
    }
    authLogin(){
        const {email, password}= this.state;
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then((result) => {
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
        })
    
    }
    render() {
        return (
            <View>
                <TextInput
                    placeholder='email'
                    onChangeText={(email)=>this.setState({email})}
                />
                <TextInput
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText={(password)=>this.setState({password})}
                />
                <Button
                    onPress={() =>this.authLogin()}
                    title='Login'
                />
            </View>
        )
    }
}

export default login