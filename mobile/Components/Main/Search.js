
import React, { useState, useEffect} from 'react'
import {View, Text,TextInput,FlatList,ListItem,Button,Modal} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchTrainers,fetchTrainer} from '../../Actions/SubscriberActions'
import Trainer from './Trainer'


function Search(props) {
    const [search,setSearch]=useState('')
    const [searchResults,setSearchResult]=useState([])
    const[user,setUser] = useState(null)
    
 
    useEffect(()=>
    {   
        const{currentUser,searchResult,profileData}=props;
        setUser(profileData.uid)
        setSearchResult(searchResult)
    })
    
   
    return (
        <View style={{justifyContent:'center',alignItems:'center'}}>
            <TextInput style={{borderColor:'#acfacb',borderWidth:2,height:50,fontSize:16,fontSize:24, backgroundColor:'#f1f1f1',width:300,borderRadius:20}}
            placeholder='Search For Trainer'
            onChangeText={(search)=>{props.fetchTrainers(search)}}
            />
          
             <FlatList
             data={searchResults}
             renderItem={({item})=>
             <View style={{justifyContent:'center',alignItems:'center',height: 50,width:300,backgroundColor:'#bbc2ff', borderColor:'#acfacb',borderWidth:2, borderRadius:8,margin:5}}>
             <Text style={{height: 50, fontSize:22,color: '#fdfdfd' }}>{item.name.firstName} {item.name.lastName}</Text>
             <Button
             title='More info'
             onPress={() => {
                
                const name = {
                  first:item.name.firstName,
                  last:item.name.lastName
                  
                }
                props.fetchTrainer(name)
                Trainer()
              }}/>
                 
         
             </View>
            }/>
           
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
