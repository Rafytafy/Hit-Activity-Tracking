import {View, Text,FlatList, Button} from 'react-native'
import axios from 'axios'
import firebase from 'firebase'
import React, { useState, useEffect} from 'react'
import {loadSubToken,loadProfileData} from '../../Actions/SubscriberActions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'


function Profile(props) {
          const[profData,setProfData] = useState([])
          const[name,setName]=useState([])
          const[user,setUser] = useState(null)
          const[age,setAge] = useState(0)
          const[height,setHeight] = useState([])
          
          
         
          useEffect(()=>
          {
            const{currentUser,profileData}=props
            setProfData(profileData)
            setUser(currentUser)
            setName(profileData.name)
           setHeight(profileData.height)
            var today = new Date();
            var cDay=today.getDate();
            var cMonth=today.getMonth();
            var cYear=today.getFullYear();
            var todayDate= new Date(cYear,cMonth,cDay);
           
            var birth = new Date(profileData.birthdate)
            var diff= Math.abs(todayDate-birth)
            const age =Math.floor(diff/31536000000)
            setAge(age)
          
            
          })
         
          const logOut = () => {
            firebase.auth().signOut()
          } 

    return (
        <View >
           
            <br/>
            <View style={{alignItems: 'center'}}> 
              <Text  style={{marginTop:100}}>
                {name.firstName}  {name.lastName} 
              </Text>
            </View>
           
            <br/>
            <View style={{flex: 1, flexDirection: 'row',justifyContent: 'space-between',
                          margin:40}}>
                <Text >
                  {profData.weight} lbs.
                </Text>   
                <Text >
                  {age} Years 
                </Text>
                <Text> 
                  {height.feet}'{height.inches}"
                </Text>
             </View>
             <Button 
                onPress={() => logOut()}
                title= 'Log Out'
            />
        </View>
    )
}

const mapStateToProps=(store)=> ({
    currentUser: store.subscriber.currentUser,
    profileData:store.subscriber.profileData
    
  })
 
   
  

  export default connect(mapStateToProps, null) (Profile);