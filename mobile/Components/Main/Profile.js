import {View, Text} from 'react-native'
import axios from 'axios'
import firebase from 'firebase'
import React, { useState, useEffect} from 'react'
import {loadSubToken,loadProfileData} from '../../Actions/SubscriberActions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

function Profile() {
           
    useEffect(()=>{
        loadProfileData(store.subscriber.currentUser)

    })
   
   console.log(store.subscriber.currentUser)
   console.log(store.subscriber.profileData)
      
    return (
        <View>
            <Text>Profile 
                <br/>
                Name: 
                </Text>
               
                <Text>
                           
                Age: '           '
                
                Weight: '   '    
                <br/>
               Calender

            </Text>
        </View>
    )
}

const mapStateToProps=(store)=> ({
    currentUser: store.subscriber.currentUser,
    profileData: store.subscriber.profileData
  })
  const mapDispatchProps=(dispatch)=>bindActionCreators({loadSubToken,loadProfileData}, dispatch)
  
  export default connect(mapStateToProps, mapDispatchProps) (Profile);