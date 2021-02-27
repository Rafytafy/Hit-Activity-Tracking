
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
        <View>
            <TextInput style={{borderColor:'#acfacb',borderWidth:2,height:50,fontSize:16,fontSize:24, backgroundColor:'#f1f1f1'}}
            placeholder='Search For Trainer'
            onChangeText={(search)=>{props.fetchTrainers(search)}}
            />
          
             <FlatList
             data={searchResults}
             renderItem={({item})=>
             <View style={{height: 50,backgroundColor:'#bbc2ff', borderColor:'#acfacb',borderWidth:2, borderRadius:5}}>
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
