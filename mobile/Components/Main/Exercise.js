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

    const renderProgramCards = () => {
      return (
        props.routines.map((routine) => (
          <View style={styles.programCard}>
          <Text>{routine.name}</Text>
          {routine.workouts.map((item) => (
            <Text>{item.workout.name}</Text>
          ))}
          </View>
        ))
      )
    }
  return (
    <ScrollView style={styles.scrollContainer}>
      <View
        style={{
          marginTop: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
      
        {renderProgramCards()}

      </View>
    </ScrollView>
  );
}
const mapStateToProps = (store) => ({
  currentUser: store.subscriber.currentUser,
  profileData: store.subscriber.profileData,
  routines: store.subscriber.profileData.routines
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ getRoutines }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Exercise);
