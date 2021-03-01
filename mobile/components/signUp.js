import React, { useState} from 'react'
import {Button, Text, View,TextInput,Dimensions } from 'react-native';
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
    var { width, height } = Dimensions.get('window');
    height=height-55
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
            <View style={{alignItems: 'center', backgroundColor:'#bbc2ff',height:height,width:width}}>
                    <Text style={{fontSize: 16,color:'#fdfdfd'}}>Name</Text>
                <TextInput  style={{borderColor:'#acfacb',borderWidth:2,height:40,fontSize:16,fontSize:16, backgroundColor:'#f1f1f1', width:200 ,marginTop:15}}
                    placeholder='First Name'
                    onChangeText={(value)=>setFirstName(value)}
                    name='firstName'
                    type='text'
                />
                <TextInput  style={{borderColor:'#acfacb',borderWidth:2,height:40,fontSize:16,fontSize:16, backgroundColor:'#f1f1f1', width:200,marginTop:15 }}
                    placeholder='Last Name'
                    onChangeText={(value)=>setLastName(value)}
                    name='lastName'
                />

               
    
                <Text style={{fontSize: 16,color:'#fdfdfd'}}>Birthdate</Text>

                 <View style={{flex: 1, flexDirection: 'row',justifyContent: 'space-between',marginTop:15}}>
             
                <TextInput style={{borderColor:'#acfacb',borderWidth:2,height:40,fontSize:16,fontSize:16, backgroundColor:'#f1f1f1', width:100, marginLeft:8,marginRight:8}}
                    placeholder='Month (01)' 
                    onChangeText={(value)=>setMonth(value-1)}
                    name='month'
                    maxLength={2}
                />
                  <TextInput style={{borderColor:'#acfacb',borderWidth:2,height:40,fontSize:16,fontSize:16, backgroundColor:'#f1f1f1', width:100,marginLeft:8,marginRight:8 }}
                    placeholder='Day (01)' 
                    onChangeText={(value)=>setDay(value)}
                    maxLength={2}
                    name='day'
                />
           
                  <TextInput  style={{borderColor:'#acfacb',borderWidth:2,height:40,fontSize:16,fontSize:16, backgroundColor:'#f1f1f1', width:140,marginLeft:8,marginRight:8}}
                  placeholder='Year (2001)' 
                  onChangeText={(value)=>setYear(value)}
                maxLength={4}
                  name='year'
              />

                 </View>
               
                 <Text style={{fontSize: 16,color:'#fdfdfd'}}>Weight</Text>
                <TextInput style={{borderColor:'#acfacb',borderWidth:2,height:40,fontSize:16,fontSize:16, backgroundColor:'#f1f1f1', width:100,marginLeft:8,marginRight:8,marginTop:15 }}
                    placeholder='weight'
                    onChangeText={(value)=>setWeight(value)}
                    name='weight'
                    maxLength={3}
                />
                    <Text style={{fontSize: 16,color:'#fdfdfd'}}>Height</Text>
                <View style={{flex: 1, flexDirection: 'row',justifyContent: 'space-between',marginTop:15}}>
                <TextInput  style={{borderColor:'#acfacb',borderWidth:2,height:40,fontSize:16,fontSize:16, backgroundColor:'#f1f1f1', width:100,marginLeft:8,marginRight:8 }}
                    placeholder='feet'
                    keyboardType = 'numeric'
                    onChangeText={(value)=>setHeightFeet(value)}
                    name='heightFeet'
                    maxLength={1}
                />
                <TextInput  style={{borderColor:'#acfacb',borderWidth:2,height:40,fontSize:16,fontSize:16, backgroundColor:'#f1f1f1', width:100,marginLeft:8,marginRight:8 }}
                    placeholder='inches'
                    keyboardType = 'numeric'
                    onChangeText={(value)=>setHeightInches(value)}
                    name='heightInches'
                    maxLength={2}
                />

                </View>
                <Text style={{fontSize: 16,color:'#fdfdfd'}}>Email</Text>
                <TextInput  style={{borderColor:'#acfacb',borderWidth:2,height:40,fontSize:16,fontSize:16, backgroundColor:'#f1f1f1', width:250,marginTop:15 }}
                    placeholder='email'
                    keyboardType = 'numeric'
                    onChangeText={(value)=>setEmail(value)}
                    name='email'
                />
                    <Text style={{fontSize: 16,color:'#fdfdfd'}}>Password</Text>
                <TextInput  style={{borderColor:'#acfacb',borderWidth:2,height:40,fontSize:16,fontSize:16, backgroundColor:'#f1f1f1', width:200,marginTop:15 }}
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText={(value)=>setPassword(value)}
                    name='password'
                />
                <TextInput  style={{borderColor:'#acfacb',borderWidth:2,height:40,fontSize:16,fontSize:16, backgroundColor:'#f1f1f1', width:200,marginTop:15 }}
                    placeholder='password again'
                    secureTextEntry={true}
                    onChangeText={(value)=>setPasswordCheck(value)}
                    name='passwordCheck'
                />
                  <View style={{backgroundColor:'#bbc2ff',borderWidth:2,borderColor:'#acfacb',borderRadius:20}}>
                <Button 
                color='rgba(0, 0, 0, 0)'
                style={{marginTop:35}}
                    onPress={() =>register()}
                    title='Register'
                />
                </View>
            </View>
        )
    }




export default signUp;