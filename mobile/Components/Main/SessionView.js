import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  Alert,
  Image,
  Dimensions,
  FlatList
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {VictoryPie,VictoryLabel} from 'victory-native'

import styles, {
  color2Dark,
  color3,
  color2,
  color1Dark,
  color1,
} from "../../styles";
const width = Dimensions.get("screen").width;
import {
    getSessions
  
  } from "../../Actions/SubscriberActions"
import getAge from "../../functions/getAge";
import avgHR from "../../functions/average"
function SessionView(props) {
    const [sessions, setSessions] = useState([]);
    const[ heartRates,SetHeartRates] = useState([{time:1,value:5}]);
    const [maxHR, setMaxHR] = useState(220);
    const [test,setTest]= useState(['no','way'])
    const [tarHR,settarHR]=useState(1);
    
    
    useEffect(() => {
      const { currentUser, profileData, sessions } = props;
      setSessions(sessions.reverse());
      setMaxHR(220 - getAge(profileData.birthdate));
    });

    const formatDate = (date) => {
      var temp = new Date(date)
    
      return(`${temp.toLocaleString('default', { month: 'short' })} ${temp.getDate()}.`)

    }
    const maxHRcalc = (sesh) =>{
var max=0 
sesh.heartrate.forEach(ele=>{
  if(ele.value>max){
    max=ele.value
  }
})
return max
}




    const calculateSuccess =( (sesh) => {
      var tarHR = Math.round(maxHR * (sesh.routine.targetHeartrate * 0.01));
      settarHR(tarHR)
      var secTot = 0;
      var secAbove = 0;
    
      const overUnder = ((tuple) => {
        if (tuple.value < tarHR) {
          secTot += 5;
        } else {
          secTot += 5;
          secAbove += 5;
        }
      });
    
      sesh.heartrate.forEach(element => {
        overUnder(element)
    });
    return Math.round((secAbove/secTot)*100)
    });
    return(

        <View style={{...styles.container}}>
          <View style={{marginTop:75,marginBottom:25}}>

          
           <FlatList
           
           data={sessions}
           scrollEnabled={true}
           renderItem={({ item }) => (
             <View style={{...styles.profileCard,height: 375,marginBottom:30,width:350,}}>
               <View
                 style={{
              marginTop:20,
                   flexDirection: "row",
                   borderBottomWidth:2
                 }}
               >
                 <View style={{ flex: 2, marginLeft: 15 }}>
                  <Text style={{ fontSize: 36, color: "#333" }}>
                    {item.routine.name}
                  </Text>

                 </View>
                 <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 30, color: "#333",textAlign:'right' }}>
                     {formatDate(item.date)} 
                   </Text>
                   </View>
                 </View>

                 
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop:5

                  }}
                >
                  <Text style={{ fontSize: 24,paddingRight:20}}>
               Target HR: {"\n"}
                  Average HR:  {"\n"}
                  Maximum HR:
                  </Text>
                  <Text style={{ fontSize: 24, textAlign:'right'}}>
                {Math.round(item.routine.targetHeartrate*.01*maxHR)} BPM  {"\n"}
                   {avgHR(item)} BPM{"\n"}
                  {maxHRcalc(item)} BPM 
                  </Text>
                </View>
         


             






              
                 <View >
                   <Text  style={{ textAlign:'center',fontSize:22,marginTop:15}}>
                   Time Above Target HR
                   </Text>
                   <Text style={{ textAlign:'center',marginTop:70,marginBottom:-140,marginLeft:5,fontSize:25}}>
                   {calculateSuccess(item)}%
             </Text>
                 <VictoryPie
                 
                 data={[{y:calculateSuccess(item)},{y:100-calculateSuccess(item)}]}
                 colorScale={['#81C784','#E57373']}
                 width={250}
                 height={250}
                 innerRadius={50}
                 labels={[``]}
     
              
         s />
 


    
                 </View>
          
             </View>
           )}
           />

          
          
          </View>
        </View>
    )

}
const mapStateToProps = (store) => ({
  currentUser: store.subscriber.currentUser,
  profileData: store.subscriber.profileData,
 sessions: store.subscriber.sessions,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators(
    { getSessions},
    dispatch
  );
export default connect(mapStateToProps, mapDispatchProps)(SessionView);
