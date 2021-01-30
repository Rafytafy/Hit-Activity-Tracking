import React, { useState } from 'react'
import {Button, StyleSheet, Text, View,TextInput } from 'react-native';
import firebase from 'firebase';
import styles from '../styles';

export  function login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const authLogin =() =>{
        
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    
        return (
            <View style={styles.loginContainer}>
                <TextInput style={styles.inputBox}
                    placeholder='E-mail'
                    onChangeText={(value)=>setEmail(value)}
                    naem='email'
                />
                <TextInput style={styles.inputBox}
                    placeholder='Password'
                    secureTextEntry={true}
                    onChangeText={(value)=>setPassword(value)}
                    name='password'
                />
                <Button style={styles.loginButton}
                    onPress={() =>authLogin()}
                    title='Login'
                />
            </View>
        )
    }


export default login