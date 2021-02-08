import {View, Text} from 'react-native'
import axios from 'axios'
import firebase from 'firebase'
import React, { useState, useEffect} from 'react'


export default function Profile() {
    const getData = () => {
        axios.get('http://localhost:5000/subData/getProfileData',{tokenId})
        .then((res) =>{
             const data = res.data
            setProfileData(data)
            console.log(profileData)})
            .catch(()=>{alert('error getting data')})

    }
    const [profileData, setProfileData] = useState("")
    const [tokenId, setCurtoken]  = useState("")
    useEffect(()=>{
      firebase.auth().currentUser.getIdToken(true).then((res)=>setCurtoken(res))
      
        console.log(tokenId)
        getData()
    })
   
   
   
   
    return (
        <View>
            <Text>Profile
                <br/>
                Name: '                        '
            
                Age: '           '
                
                Weight: '   '    
                <br/>
               Calender

            </Text>
        </View>
    )
}


            
    