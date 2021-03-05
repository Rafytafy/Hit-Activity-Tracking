
import React, { useState, useEffect} from 'react'
import {View, Text,TextInput,FlatList,Button,Modal,TouchableHighlight,Alert} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchTrainers,fetchTrainer,subscribe} from '../../Actions/SubscriberActions'


const filler = {
  firstName:'who',
  lastName:'cares'
  
}
function Search(props) {
    const [search,setSearch]=useState('')
    const [searchResults,setSearchResult]=useState([])
    const[user,setUser] = useState(null)
    const[trainer,setTrainer] = useState([])
    const[trainerid,settrainerid] = useState('who knows')
    const[modalVisible,setModalVisible]=useState(false)
    const[trainerName,setTrainerName] = useState(filler)
    const[trainerEmail,setTrainerEmail] = useState('filler')
 
    useEffect(()=>
    {   
        const{currentUser,searchResult,profileData,trainer}=props;
        setUser(profileData.uid)
        setSearchResult(searchResult)
        setTrainer(trainer)
        if(typeof trainer.name !== 'undefined'){
          settrainerid(trainer._id)
          setTrainerName(trainer.name)
        setTrainerEmail(trainer.email)}
        
     
    })
    
   
    return (
      
        <View style={{justifyContent:'center',alignItems:'center'}}>
            <TextInput style={{borderColor:'#acfacb',borderWidth:2,height:50,fontSize:16,fontSize:24, backgroundColor:'#f1f1f1',width:300,borderRadius:20,padding:15,marginTop:50}}
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
             <View  >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible} 
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} >
          <View >
            <Text>{trainerName.firstName} {trainerName.lastName}{'\n'}{trainerEmail}</Text>
            <TouchableHighlight
              style={{  backgroundColor: '#2196F3' }}
              onPress={() => {
                const subPair = {
                  user:user,
                  trainer:trainerid
                }
               props.subscribe(subPair)
              }}>
              <Text >Subscribe</Text>
            </TouchableHighlight>
            <Text>{"\n\n\n\n"}</Text>
            <TouchableHighlight
              style={{  backgroundColor: '#2196F3' }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text >Hide  the Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal> 

   
    </View> 
                
                
                
      
             
    
        </View>
    )
}
const mapStateToProps=(store)=> ({
    currentUser: store.subscriber.currentUser,
    searchResult: store.subscriber.searchResult,
    profileData: store.subscriber.profileData,
    trainer: store.subscriber.trainer
    
  })
  const mapDispatchProps=(dispatch)=> bindActionCreators({fetchTrainers,fetchTrainer,subscribe},dispatch)
export default connect(mapStateToProps,mapDispatchProps)(Search);
