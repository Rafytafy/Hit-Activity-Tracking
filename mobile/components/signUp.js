import React, { useState} from 'react'
import {Button, Text, View,TextInput,Dimensions,ScrollView,StyleSheet,Alert } from 'react-native';
import firebase from 'firebase'
import axios from 'axios'
const styles = StyleSheet.create({
    inputBoxText:{
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
    },
    inputBoxNum:{
        padding:10,
        borderRadius:20,
        borderColor:'#acfacb',
        borderWidth:2,
        height:40,
        fontSize:16,
        fontSize:16, 
        backgroundColor:'#f1f1f1',
         width:70,
         marginTop:15,
         marginBottom:20 
    },
    fields:{
        color:'#fdfdfd',
        borderBottomWidth:1,
        borderBottomColor:'#fdfdfd',
        fontSize: 22,
    }
})
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
        if(month>0 && month<<12 && day>0 && day<32 && year>1920 &&year<2021){
            if(heightFeet>3 && heightFeet<9 && heightInches<12){
                    firebase.auth().createUserWithEmailAndPassword(email,password)
                .then( () => { firebase.auth().currentUser.getIdToken(true)
                    .then((res) => {
                        var tokenId = res
                        var birthdate = new Date(year,month,day)
                                
                        axios.post('http://10.0.0.9:5000/register/subscriber',{
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
            else{
                Alert.alert(
                    "Invalid Height",
                    " Please Check Height",
                    [
                     
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                  ); 
            }
         
        }
        else{
            Alert.alert(
                "Invalid Date",
                " Please Check BirthDate",
                [
                 
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
        }
      
    }
    else
        {
            Alert.alert(
                "Passwords Don't Match",
                "Please Check Passwords or not at Least 6 Characters Long",
                [
                 
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              ); }
    }
           
        return (
            <ScrollView>
            <View style={{alignItems: 'center', backgroundColor:'#bbc2ff',height:height,width:width}}>
                <View style={styles.fields}>
                    <Text style={styles.fields}>Name</Text>
                </View>
                    
                <TextInput  style={styles.inputBoxText}
                    placeholder='First Name'
                    onChangeText={(value)=>setFirstName(value)}
                    name='firstName'
                    type='text'
                />
                <TextInput  style={styles.inputBoxText}
                    placeholder='Last Name'
                    onChangeText={(value)=>setLastName(value)}
                    name='lastName'
                />

               
<View style={styles.fields}>
    <Text style={styles.fields}>Birthdate</Text>
</View>
                

                 <View style={{ flexDirection: 'row',justifyContent: 'space-between',marginTop:15}}>
             
                <TextInput style={styles.inputBoxNum}
                    placeholder='Month (01)' 
                    onChangeText={(value)=>setMonth(value-1)}
                    name='month'
                    maxLength={2}
                />
                  <TextInput style={styles.inputBoxNum}
                    placeholder='Day (01)' 
                    onChangeText={(value)=>setDay(value)}
                    maxLength={2}
                    name='day'
                />
           
                  <TextInput  style={styles.inputBoxNum}
                  placeholder='Year (2001)' 
                  onChangeText={(value)=>setYear(value)}
                maxLength={4}
                  name='year'
              />

                 </View>
               <View  style={{ ... styles.fields,flexDirection: 'row',justifyContent: 'space-between',marginTop:15}}>
                 <Text style={{...styles.fields, marginRight:100}}>Weight</Text>
                 <Text style={styles.fields}>Height</Text>  
               </View>
                 
                
                    
                <View style={{ flexDirection: 'row',justifyContent: 'space-between',marginTop:15}}>
                
                <TextInput style={{...styles.inputBoxNum,marginRight:20}}
                    placeholder='weight'
                    onChangeText={(value)=>setWeight(value)}
                    name='weight'
                    maxLength={3}
                />
                <View style={{flexDirection: 'row',marginLeft:20}}>
                       <TextInput  style={{...styles.inputBoxNum,marginLeft:30,marginRight:20}}
                    placeholder='feet'
                    keyboardType = 'numeric'
                    onChangeText={(value)=>setHeightFeet(value)}
                    name='heightFeet'
                    maxLength={1}
                />
                <TextInput  style={styles.inputBoxNum}
                    placeholder='inches'
                    keyboardType = 'numeric'
                    onChangeText={(value)=>setHeightInches(value)}
                    name='heightInches'
                    maxLength={2}
                />
                </View>
             

                </View>
                <View  style={styles.fields}>
                    <Text style={styles.fields}>Email</Text> 
                </View>
               
                <TextInput  style={styles.inputBoxText}
                    placeholder='email'
                    keyboardType = 'text'
                    onChangeText={(value)=>setEmail(value)}
                    name='email'
                />
                <View  style={styles.fields}>
                    <Text style={styles.fields}>Password</Text>
                </View>

                    
                <TextInput  style={styles.inputBoxText}
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText={(value)=>setPassword(value)}
                    name='password'
                />
                <TextInput  style={styles.inputBoxText}
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
                    color='#fdfdfd'
                />
                </View>
                <View>
                <Text>{"\n"}</Text>
                <Text>{"\n"}</Text>
                <Text>{"\n"}</Text>
                </View>
            </View>
            </ScrollView>
        )
    }




export default signUp;