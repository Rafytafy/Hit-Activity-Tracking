
import React, { useState, useEffect} from 'react'
import {View, Text,TextInput,FlatList,ListItem} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchTrainers} from '../../Actions/SubscriberActions'


function Search(props) {
    const [search,setSearch]=useState('')
    const [searchResults,setSearchResult]=useState([])
    const[user,setUser] = useState(null)
    
 
    useEffect(()=>
    {
        const{currentUser,searchResult}=props;
        setUser(currentUser)
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
             <View style={{backgroundColor:'gray'}}></View>
             </View>
            }/>
           
        </View>
    )
}
const mapStateToProps=(store)=> ({
    currentUser: store.subscriber.currentUser,
    searchResult: store.subscriber.searchResult
    
  })
  const mapDispatchProps=(dispatch)=> bindActionCreators({fetchTrainers},dispatch)
export default connect(mapStateToProps,mapDispatchProps)(Search);
