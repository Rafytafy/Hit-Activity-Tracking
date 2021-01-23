import React, { Component } from 'react'
import {Button, StyleSheet, Text, View,TextInput } from 'react-native';
import firebase from 'firebase';

export class signUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstName:'',
            lastName:'',
            birthdate:'',
            weight:0,
            heightFeet:0,
            heightInches:0,
            email: '',
            password:'',
            passwordCheck:''
        }
        this.register=this.register.bind(this)
    }
    register(){
        const {  firstName,
        lastName,
        birthdate,
        weight,
        heightFeet,
        heightInches,
        email,
        password,
        passwordCheck}= this.state;
        if (password==passwordCheck){
            firebase.auth().createUserWithEmailAndPassword(email,password)
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            })
        }
        
    
    }
    render() {
        return (
            <View>
                <TextInput
                    placeholder='First Name'
                    onChangeText={(firstName)=>this.setState({firstName})}
                />
                <TextInput
                    placeholder='Last Name'
                    onChangeText={(lastName)=>this.setState({lastName})}
                />
                <TextInput
                    placeholder='Birthdate (01/01/2021)'
                    onChangeText={(birthdate)=>this.setState({birthdate})}
                />
                <TextInput
                    placeholder='weight'
                    onChangeText={(weight)=>this.setState({weight})}
                />
                <Text
                    Height
                />
                <TextInput
                    placeholder='feet'
                    onChangeText={(heightFeet)=>this.setState({heightFeet})}
                />
                <TextInput
                    placeholder='inches'
                    onChangeText={(heightInches)=>this.setState({heightInches})}
                />
                <TextInput
                    placeholder='email'
                    onChangeText={(email)=>this.setState({email})}
                />
                <TextInput
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText={(password)=>this.setState({password})}
                />
                <TextInput
                    placeholder='password again'
                    secureTextEntry={true}
                    onChangeText={(passwordCheck)=>this.setState({passwordCheck})}
                />
                <Button
                    onPress={() =>this.register()}
                    title='Register'
                />
            </View>
        )
    }
}

export default signUp