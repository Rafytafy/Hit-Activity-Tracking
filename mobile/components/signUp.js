import React, { useState} from 'react'
import {Button, Text, View,TextInput } from 'react-native';
import firebase from 'firebase'
import axios from 'axios'

export function signUp() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [birthdate, setBirthdate] = useState("")
    const [weight, setWeight] = useState(0)
    const [heightFeet, setHeightFeet] = useState(0)
    const [heightInches, setHeightInches] = useState(0)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordCheck, setPasswordCheck] = useState("")
    
    const register = () =>  {if (password==passwordCheck){
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then( () => { firebase.auth().currentUser.getIdToken(true)
            .then((res) => {
                var tokenID = res.data()
                axios.post('http://localhost:5000/register/subscriber',{
                    tokenID,
                    firstName,
                    lastName,
                    birthdate,
                    weight,
                    heightFeet,
                    heightInches,
                    email
                })
                .then((res) => {   
                    console.log(res.data)
                    })
                .catch(err =>  {
                   console.log(err)
                    })
            })
        })
    }
    else
        {console.log('passwords dont match')}
    }
           
        return (
            <View>
                <TextInput
                    placeholder='First Name'
                    onChangeText={(value)=>setFirstName(value)}
                    name='firstName'
                    type='text'
                />
                <TextInput
                    placeholder='Last Name'
                    onChangeText={(value)=>setLastName(value)}
                    name='lastName'
                />
                <TextInput
                    placeholder='Birthdate (01/01/2021)'
                    onChangeText={(value)=>setBirthdate(value)}
                    name='birthdate'
                />
                <TextInput
                    placeholder='weight'
                    onChangeText={(value)=>setWeight(value)}
                    name='weight'
                />
                <Text
                    Height
                />
                <TextInput
                    placeholder='feet'
                    keyboardType = 'numeric'
                    onChangeText={(value)=>setHeightFeet(value)}
                    name='heightFeet'
                />
                <TextInput
                    placeholder='inches'
                    keyboardType = 'numeric'
                    onChangeText={(value)=>setHeightInches(value)}
                    name='heightInches'
                />
                <TextInput
                    placeholder='email'
                    keyboardType = 'numeric'
                    onChangeText={(value)=>setEmail(value)}
                    name='email'
                />
                <TextInput
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText={(value)=>setPassword(value)}
                    name='password'
                />
                <TextInput
                    placeholder='password again'
                    secureTextEntry={true}
                    onChangeText={(value)=>setPasswordCheck(value)}
                    name='passwordCheck'
                />
                <Button
                    onPress={() =>register()}
                    title='Register'
                />
            </View>
        )
    }




export default signUp;