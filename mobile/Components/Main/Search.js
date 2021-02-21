
import React, { useState, useEffect} from 'react'
import {View, Text,TextInput,FlatList,ListItem} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchTrainers} from '../../Actions/SubscriberActions'


function Search(props) {
    const [search,setSearch]=useState('')
    const [searchResults,setSearchResult]=useState('')
    const[user,setUser] = useState(null)
    
    const[searchArray,setSearchArray]=useState([])
    useEffect(()=>
    {
        const{currentUser,searchResult}=props;
        setUser(currentUser)
        setSearchResult(searchResult)
        console.log(searchResults)
     
        for (var i = 0; i < Math.min(searchResult.length,10); i++) {
            
            console.log(searchResult[i].name.firstName)
            console.log(searchResult[i].name.lastName );
           
        }
       
    })
    
 

    return (
        <View>
            <TextInput 
            onChangeText={(search)=>{props.fetchTrainers(search)}}
            />
           {/* <FlatList
         data={searchResults}
         renderItem={({item})=>(
            <ListItem
            name={`${item.name.firstName} ${item.name.lastName}`}
            />
         )}
         keyExtractor={item => item.email}
           /> */}
        </View>
    )
}
const mapStateToProps=(store)=> ({
    currentUser: store.subscriber.currentUser,
    searchResult: store.subscriber.searchResult
    
  })
  const mapDispatchProps=(dispatch)=> bindActionCreators({fetchTrainers},dispatch)
export default connect(mapStateToProps,mapDispatchProps)(Search);
