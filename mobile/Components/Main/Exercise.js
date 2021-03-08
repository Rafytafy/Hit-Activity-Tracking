import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { getRoutines } from "../../Actions/SubscriberActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "../../styles";
function Exercise(props) {
  const [profData, setProfData] = useState([]);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const { currentUser, profileData, routines } = props;
    setUser(currentUser);
  });
  return (
    <ScrollView style={styles.scrollContainer}>
      <View
        style={{
          marginTop: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.programCard}>
          <Text>Exercise</Text>
          <Text>
            {/* {routines.this} {rotuiines.that} you get the point rafy, this is a card for the routines 
             prolly want ot make a funtion to loop throught the routines and create cards 
             flat list that i have on the search page casues problems in a scroll view
            programCard is teh last one on the stlyes sheet for cahnges you want to make there*/}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
const mapStateToProps = (store) => ({
  currentUser: store.subscriber.currentUser,
  profileData: store.subscriber.profileData,
  rotuines: store.subscriber.rotuines,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ getRoutines }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Exercise);
