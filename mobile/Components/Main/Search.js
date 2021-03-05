
import React, { useState, useEffect} from 'react'
import {View, Text,TextInput,FlatList,Button,Modal,TouchableHighlight} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchTrainers,fetchTrainer} from '../../Actions/SubscriberActions'
import Trainer from './Trainer'


function Search(props) {
    const [search,setSearch]=useState('')
    const [searchResults,setSearchResult]=useState([])
    const[user,setUser] = useState(null)
    const[modalVisible,setModalVisible]=useState(false)
 
    useEffect(()=>
    {   
        const{currentUser,searchResult,profileData}=props;
        setUser(profileData.uid)
        setSearchResult(searchResult)
    })
    
   
    return (
        <View style={{justifyContent:'center',alignItems:'center'}}>
            <TextInput style={{borderColor:'#acfacb',borderWidth:2,height:50,fontSize:16,fontSize:24, backgroundColor:'#f1f1f1',width:300,borderRadius:20,padding:15}}
            placeholder='Search For Trainer'
            onChangeText={(search)=>{props.fetchTrainers(search)}}
            />
          
             <FlatList
             data={searchResults}
             renderItem={({item})=>
             <View style={{justifyContent:'center',alignItems:'center',height: 80,width:300,backgroundColor:'#bbc2ff', borderColor:'#acfacb',borderWidth:2, borderRadius:8,margin:5}}>
             <Text style={{fontSize:22,color: '#fdfdfd' }}>{item.name.firstName} {item.name.lastName}</Text>
             <Button
             style={{height:1,fontSize:6}}
             title='More info'
             onPress={() => {
                
                const name = {
                  first:item.name.firstName,
                  last:item.name.lastName
                  
                }
                props.fetchTrainer(name)
                
                setModalVisible(!modalVisible)
              }}/>
                 
         
             </View>
            }/>
             <View >
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible} 
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View >
          <View >
            <Text>Hello World!</Text>

            <TouchableHighlight
              style={{  backgroundColor: '#2196F3' }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text >Hide  the Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal> */}

      {/* <TouchableHighlight
     
        onPress={() => {
          setModalVisible(true);
        }}>
        <Text >Show Modal</Text>
      </TouchableHighlight> */}
    </View>
                
                
                
      
             
    
        </View>
    )
}
const mapStateToProps=(store)=> ({
    currentUser: store.subscriber.currentUser,
    searchResult: store.subscriber.searchResult,
    profileData: store.subscriber.profileData
    
  })
  const mapDispatchProps=(dispatch)=> bindActionCreators({fetchTrainers,fetchTrainer},dispatch)
export default connect(mapStateToProps,mapDispatchProps)(Search);
