import React, { useState } from 'react'
import {Button, StyleSheet, Text, View,TextInput,Dimensions } from 'react-native';
import firebase from 'firebase';

const styles = StyleSheet.create({
    inputBox:{
        padding:10,
        borderRadius:20,
        borderColor:'#acfacb',
        borderWidth:2,
        height:40,
        fontSize:16,
        fontSize:16, 
        backgroundColor:'#f1f1f1',
         width:250,
         marginTop:15,
         marginBottom:20 
    }
})

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
                   <View style={{flex:2}}>
            </View >
            <View style={{flex:3}}>
           
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
            <View style={{backgroundColor:'#bbc2ff',borderWidth:2,borderColor:'#acfacb',borderRadius:20}}>
                 <Button 
            color='rgba(0, 0, 0, 0)'
                onPress={() =>authLogin()}
                title='Login'
            />
             </View >
               <View style={{flex:2}}>
            </View >
            </View>
           
        </View>
        )
    }


export default login