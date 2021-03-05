import {View, Text,FlatList, Button, TextInput,ScrollView,Alert} from 'react-native'
import axios from 'axios'
import firebase from 'firebase'
import React, { useState, useEffect} from 'react'
import {addWeight,clearSearch,getWeights} from '../../Actions/SubscriberActions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'


function Profile(props) {
          const[profData,setProfData] = useState([])
          const[name,setName]=useState([])
          const[user,setUser] = useState(null)
          const[age,setAge] = useState(0)
          const[height,setHeight] = useState([])
          const[weightss,setWeights] = useState([])
          const[weightToAdd,setWeightToAdd]=useState()
          
         
          useEffect(()=>
          {
            
            
            const{currentUser,profileData,weights}=props
            
            setProfData(profileData)
            setUser(profileData._id )
            setWeights(weights)
            setName(profileData.name)
            setHeight(profileData.height)
            var today = new Date();
            var cDay=today.getDate();
            var cMonth=today.getMonth();
            var cYear=today.getFullYear();
            var todayDate= new Date(cYear,cMonth,cDay);
            
            var birth = new Date(profileData.birthdate)
            var diff= Math.abs(todayDate-birth)
            const age =Math.floor(diff/31536000000)
            setAge(age)
            
            
          })
         
          const logOut = () => {
            firebase.auth().signOut()
            props.clearSearch()

          } 
          
         const formatDate = (date) =>
         {
           var date= new Date(date)
           var day= date.getDate()
           var mon = date.getMonth()+1
           var year = date.getFullYear()
           return(`${mon}/${day}/${year}`)
         }
          
         const theweights = (w) =>
         {
           var rw=w.reverse()
           return (rw)
         }
    return (
      <ScrollView>
        <View >
         <Text>{"\n"}</Text>

          
            <View style={{alignItems: 'center',marginTop:50}}> 
              <Text  style={{marginTop:100}}>
                {name.firstName}  {name.lastName} 
              </Text>
            </View>
           
            <Text>{"\n"}</Text>
            <View style={{ flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',marginHorizontal:15}}>
                <Text style={{color:'#000000'}}>
                  {profData.initWeight} lbs.
                </Text>   
                <Text >
                  {age} Years 
                </Text>
                <Text> 
                  {height.feet}'{height.inches}"
                </Text>
             </View>
             <View style={{flex: 1, flexDirection: 'row',margin:40, justifyContent:'center'}}>
             <TextInput  style={{  padding:10,marginRight:30, 
        borderRadius:20,
        borderColor:'#acfacb',
        borderWidth:2,
        height:40,
        fontSize:16,
        fontSize:16, 
        backgroundColor:'#f1f1f1',
         width:70,
         alignItems:'center' }}
                    placeholder='175' 
                    onChangeText={(value)=>setWeightToAdd(value)}
                    name='weightInput'
                    maxLength={3}
                    keyboardType = 'numeric'
                    
                    
                />
            <View style={{height:40,fontSize:16,backgroundColor:'#bbc2ff',borderWidth:2,borderColor:'#acfacb',borderRadius:20}}>
               <Button 
               color='rgba(0, 0, 0, 0)'
                onPress={() => {
                  var today = new Date();
                  var cDay=today.getDate();
                  var cMonth=today.getMonth();
                  var cYear=today.getFullYear();
                  var todayDate= new Date(cYear,cMonth,cDay);
                  const newWeight = {
                    id:user,
                    weight:weightToAdd,
                    date:todayDate
                  }
                  
                  props.addWeight(newWeight)
                  Alert.alert(
                    "Added Weight",
                    " success",
                    [
                     
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                  );
                  setTimeout(() => {
                    props.getWeights(profData._id) 
                  }, 2000);
                  
                }}
                title= 'Add Weight'
                color='#fdfdfd'
            />
            </View>
            
            </View >
            <Text>{"\n"}</Text>
          
        <View style={{justifyContent:'center',alignItems:'center'}}>
            <FlatList
             data={weightss}
             renderItem={({item})=>
             <View style={{justifyContent:'center',alignItems:'center',height: 80,width:300,backgroundColor:'#bbc2ff', borderColor:'#acfacb',borderWidth:2, borderRadius:8,margin:5}}>
             <Text style={{fontSize:22,color: '#fdfdfd' }}>{item.weight} on {formatDate(item.date)}</Text>
             
             
                 
         
             </View>
            }/>
        
           </View>
            <View style={{marginBottom:40,height:40,fontSize:16,backgroundColor:'#bbc2ff',borderWidth:2,borderColor:'#acfacb',borderRadius:20}}>
            <Button 
              color='#fdfdfd'
                onPress={() => logOut()}
                title= 'Log Out'
            />
            </View>
            
        </View>
        </ScrollView>
    )
}

const mapStateToProps=(store)=> ({
    currentUser: store.subscriber.currentUser,
    profileData:store.subscriber.profileData,
    weights:store.subscriber.weights
  })
 
const mapDispatchProps=(dispatch)=> bindActionCreators({addWeight,clearSearch,getWeights},dispatch)   
  
export default connect(mapStateToProps, mapDispatchProps) (Profile);