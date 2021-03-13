import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  TextInput,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import { getRoutines } from "../../../Actions/SubscriberActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {loadSubToken, loadProfileData} from '../../../Actions/SubscriberActions'
import styles from "../../../styles";
function Program(props) {
  let screenWidth = Dimensions.get('window').width;
  
  useEffect( () => {
    
  });

  const calculateDuration = (arr) =>{
    let totalDuration = 0
    for(let i = 0; i < arr.length; i++){
        totalDuration += arr[i].duration;
    }
    return totalDuration
}
    const renderProgramCards = () => {
      if(typeof props.routines !== "undefined"){
        return (
          props.routines.map((routine) => (
            <View
              style={{
                marginTop: 50,
                width: screenWidth,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={styles.programCard}>
              <Text style={{fontSize: 24}}>{routine.name}</Text>
              <Text>Duration: {calculateDuration(routine.workouts)}</Text>
              </View>
            </View>
            
          ))
          
        )
      }
      else {
        <Text>No Program</Text>
      }
      
    }
  return (
    <ScrollView style={styles.scrollContainer} horizontal= {true} pagingEnabled={true}>
       
        {renderProgramCards()}
      
    </ScrollView>
  );
}
const mapStateToProps = (store) => ({
  currentUser: store.subscriber.currentUser,
  profileData: store.subscriber.profileData,
  routines: store.subscriber.profileData.routines
});

const mapDispatchProps = (dispatch) => bindActionCreators({ loadSubToken, loadProfileData }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Program);
