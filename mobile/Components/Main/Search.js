
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
            <TextInput 
            onChangeText={(search)=>{props.fetchTrainers(search)}}
            />
          
             <FlatList
             data={searchResults}
             renderItem={({item})=>
             <View style={{height: 50}}>
             <Text style={{height: 50}}>{item.name.firstName} {item.name.lastName}</Text>
             <View style={{height: 1,backgroundColor:'gray'}}></View>
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
