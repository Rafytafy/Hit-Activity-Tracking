import {View, Text,FlatList, Button, TextInput} from 'react-native'
import axios from 'axios'
import firebase from 'firebase'
import React, { useState, useEffect} from 'react'
import {addWeight,clearSearch} from '../../Actions/SubscriberActions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'


function Trainer(props) {
          const[trainerData,setTrainerData] = useState([])
          const[name,setName]=useState([])
          const[user,setUser] = useState(null)
          const[age,setAge] = useState(0)
          const[height,setHeight] = useState([])
          const[weightToAdd,setWeightToAdd]=useState()
          
         
          useEffect(()=>
          {
            const{currentUser,trainerInfo}=props
            setProfData(trainerInfo)
            setUser(currentUser)
            setName(trainerInfo.name)
          })
         
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
                  lbs.
                </Text>   
                <Text >
                   Years 
                </Text>
                <Text> 
                  '"
                </Text>
             </View>
            
            
            <View >
                {/* style={{height:40,fontSize:16,backgroundColor:'#bbc2ff',borderWidth:2,borderColor:'#acfacb',borderRadius:20}} */}
            <Button 
              
                onPress={() => console.log('subscribin')}
                title= 'Subscribe'
            />
            </View>
            
        </View>
    )
}

const mapStateToProps=(store)=> ({
    currentUser: store.subscriber.currentUser,
    trainerInfo:store.subscriber.trainerInfo
  })
 
const mapDispatchProps=(dispatch)=> bindActionCreators({},dispatch)   
  
export default connect(mapStateToProps, mapDispatchProps) (Trainer);