import {View, Text,FlatList} from 'react-native'
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
          const[height,setHeight] = useState([])
          useEffect(()=>
          {
        
            const{currentUser,profileData}=props
            setProfData(profileData)
            setUser(currentUser)
            setName(profileData.name)
            setHeight(profileData.height)
            
          })
         
          

    return (
        <View>
            <Text>
                  <br/>
                Name:{name.firstName}  {name.lastName}
                <br/>

            
                
                
                Weight: {profData.weight}     
                <br/>
                Birtdate: {profData.birthdate}

            </Text>
     
</View>
    )
}

const mapStateToProps=(store)=> ({
    currentUser: store.subscriber.currentUser,
    profileData:store.subscriber.profileData
    
  })
 
   
  

  export default connect(mapStateToProps, null) (Profile);