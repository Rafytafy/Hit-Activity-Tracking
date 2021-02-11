import {View, Text} from 'react-native'
import axios from 'axios'
import firebase from 'firebase'
import React, { useState, useEffect} from 'react'
import {loadSubToken,loadProfileData} from '../../Actions/SubscriberActions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

const loadComponent = (loading,error,data) =>
{
    if(loading){
        return <Text>Loading</Text>
    }
    else if(error==null && !loading){
        return <Text>{data}</Text>
    }
    else if(error!=null){
        return <Text>{error}</Text>
    }
}

const Profile=(state,)=> {
           
    useEffect(()=>{
       loadProfileData(currentUser)

    })
   const profData= loadComponent(
       state.loading,
       state.error,
       state.profileData
   )
   
      
    return (
        <View>
            <Text>Profile 
                <br/>
                Name: 
                </Text>
               {profData}
                <Text>
                           
                Age: '           '
                
                Weight: '   '    
                <br/>
               Calender

            </Text>
        </View>
    )
}

const mapStateToProps=(state)=> 
({
    state: state.subscriber,
    currentUser: state.subscriber.currentUser,
    profileData: state.subscriber.profileData
})
const mapDispatchProps=(dispatch)=>
({
    loadSubToken:loadSubToken(dispatch),
    loadProfileData:loadProfileData(dispatch)
})
  
  export default connect(mapStateToProps, mapDispatchProps) (Profile);