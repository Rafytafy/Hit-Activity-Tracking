import React, { Component } from 'react'
import {Button, StyleSheet, Text, View,TextInput } from 'react-native';
import firebase from 'firebase';
import styles from '../styles';
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
            <View style={styles.loginContainer}>
                <TextInput style={styles.inputBox}
                    placeholder='E-mail'
                    onChangeText={(email)=>this.setState({email})}
                />
                <TextInput style={styles.inputBox}
                    placeholder='Password'
                    secureTextEntry={true}
                    onChangeText={(password)=>this.setState({password})}
                />
                <Button style={styles.loginButton}
                    onPress={() =>this.authLogin()}
                    title='Login'
                />
            </View>
        )
    }
}

export default login