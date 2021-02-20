import React, { useState, useEffect} from 'react'
import {View, Text,TextInput} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {loadSearchResults} from '../../Actions/SubscriberActions'


function Search(props) {
    const [search,setSearch]=useState('')
    const [searchResult,setSearchResult]=useState()
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
            onChangeText={()=>{loadSearchResults()}}
            />
        <Text>
            {searchResult}
        </Text>
        </View>
    )
}
const mapStateToProps=(store)=> ({
    currentUser: store.subscriber.currentUser,
    searchResult: store.subscriber.searchResult
    
  })
  const mapDispatchProps=(dispatch)=> bindActionCreators({loadSearchResults},dispatch)
export default connect(mapStateToProps,mapDispatchProps)(Search);