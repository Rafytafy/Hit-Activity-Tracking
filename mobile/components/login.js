import React, { useState } from 'react'
import {Button, StyleSheet, Text, View,TextInput,Dimensions } from 'react-native';
import firebase from 'firebase';
import styles from '../styles';

export  function login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    var { width, height } = Dimensions.get('window');
    height=height-55
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
            <View style={{alignItems: 'center', backgroundColor:'#bbc2ff',height:height,width:width}}>
            <TextInput style={{borderColor:'#acfacb',borderWidth:2,height:40,fontSize:16,fontSize:16, backgroundColor:'#f1f1f1', width:250,marginTop:15 }}
                placeholder='E-mail'
                onChangeText={(value)=>setEmail(value)}
                naem='email'
            />
            <TextInput style={{borderColor:'#acfacb',borderWidth:2,height:40,fontSize:16,fontSize:16, backgroundColor:'#f1f1f1', width:250,marginTop:15 }}
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