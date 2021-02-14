import React, { useState} from 'react'
import {Button, Text, View,TextInput } from 'react-native';
import firebase from 'firebase'
import axios from 'axios'

export function signUp() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [weight, setWeight] = useState(0)
    const [heightFeet, setHeightFeet] = useState(0)
    const [heightInches, setHeightInches] = useState(0)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordCheck, setPasswordCheck] = useState("")
    const [month , setMonth] = useState(0)
    const [day,setDay ] = useState(0)
    const [year, setYear] = useState(0)
    
    const register = () =>  {if (password==passwordCheck){
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then( () => { firebase.auth().currentUser.getIdToken(true)
            .then((res) => {
                var tokenId = res
                var birthdate = new Date(year,month,day)
                         
                axios.post('http://localhost:5000/register/subscriber',{
                    tokenId,
                    firstName,
                    lastName,
                    birthdate,
                    weight,
                    heightFeet,
                    heightInches,
                    email
                })
                .then((res) => {   
                
                    })
                .catch(err =>  {
           
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
                 <Text
                    Birthdate
                />
                <TextInput
                    placeholder='Month (01)' 
                    onChangeText={(value)=>setMonth(value-1)}
                    name='month'
                    maxLength={2}
                />
                  <TextInput
                    placeholder='Day (01)' 
                    onChangeText={(value)=>setDay(value)}
                    maxLength={2}
                    name='day'
                />
           
                  <TextInput
                  placeholder='Year (2001)' 
                  onChangeText={(value)=>setYear(value)}
                maxLength={4}
                  name='year'
              />
             
                <TextInput
                    placeholder='weight'
                    onChangeText={(value)=>setWeight(value)}
                    name='weight'
                    maxLength={3}
                />
                <Text
                    Height
                />
                <TextInput
                    placeholder='feet'
                    keyboardType = 'numeric'
                    onChangeText={(value)=>setHeightFeet(value)}
                    name='heightFeet'
                    maxLength={1}
                />
                <TextInput
                    placeholder='inches'
                    keyboardType = 'numeric'
                    onChangeText={(value)=>setHeightInches(value)}
                    name='heightInches'
                    maxLength={2}
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