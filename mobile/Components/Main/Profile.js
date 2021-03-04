import {View, Text,FlatList, Button, TextInput} from 'react-native'
import axios from 'axios'
import firebase from 'firebase'
import React, { useState, useEffect} from 'react'
import {addWeight,clearSearch} from '../../Actions/SubscriberActions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'


function Profile(props) {
          const[profData,setProfData] = useState([])
          const[name,setName]=useState([])
          const[user,setUser] = useState(null)
          const[age,setAge] = useState(0)
          const[height,setHeight] = useState([])
          const[weightToAdd,setWeightToAdd]=useState()
          
         
          useEffect(()=>
          {
            const{currentUser,profileData}=props
            setProfData(profileData)
            setUser(profileData._id)
            
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
            props.clearSearch()

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
                  {profData.initWeight} lbs.
                </Text>   
                <Text >
                  {age} Years 
                </Text>
                <Text> 
                  {height.feet}'{height.inches}"
                </Text>
             </View>
             <View style={{flex: 1, flexDirection: 'row',margin:40, justifyContent:'center'}}>
             <TextInput  style={{borderColor:'#acfacb',borderWidth:2,height:40,fontSize:16,fontSize:16, backgroundColor:'#f1f1f1', width:50, marginRight:30,alignItems:'center' }}
                    placeholder='175' 
                    onChangeText={(value)=>setWeightToAdd(value)}
                    name='weightInput'
                    maxLength={3}
                    
                />
            <View style={{height:40,fontSize:16,backgroundColor:'#bbc2ff',borderWidth:2,borderColor:'#acfacb',borderRadius:20}}>
               <Button 
               color='rgba(0, 0, 0, 0)'
                onPress={() => {
                  var today = new Date();
                  var cDay=today.getDate();
                  var cMonth=today.getMonth();
                  var cYear=today.getFullYear();
                  var todayDate= new Date(cYear,cMonth,cDay);
                  const newWeight = {
                    id:user,
                    weight:weightToAdd,
                    date:todayDate
                  }
                  props.addWeight(newWeight)
                  
                }}
                title= 'Add Weight'
            />
            </View>
            
            </View >
            
            <View style={{height:40,fontSize:16,backgroundColor:'#bbc2ff',borderWidth:2,borderColor:'#acfacb',borderRadius:20}}>
            <Button 
              color='rgba(0, 0, 0, 0)'
                onPress={() => logOut()}
                title= 'Log Out'
            />
            </View>
            
        </View>
    )
}

const mapStateToProps=(store)=> ({
    currentUser: store.subscriber.currentUser,
    profileData:store.subscriber.profileData
    
  })
 
const mapDispatchProps=(dispatch)=> bindActionCreators({addWeight,clearSearch},dispatch)   
  
export default connect(mapStateToProps, mapDispatchProps) (Profile);