import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import { getRoutines } from "../../../Actions/SubscriberActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  loadSubToken,
  loadProfileData,
  setCurrentRoutine,
} from "../../../Actions/SubscriberActions";
import styles, { color2Dark, color3, color2 } from "../../../styles";
function Program(props) {
  let screenWidth = Dimensions.get("window").width;
  const dummy = { firstName: "cur", lastName: "user" };
  const [name, setName] = useState(dummy);
  const [maxHR, setMaxHR] = useState(220);

  useEffect(() => {
    const { currentUser, profileData, routines } = props;
    if (typeof profileData.name !== "undefined") {
      setName(profileData.name);
      var today = new Date();
      var cDay = today.getDate();
      var cMonth = today.getMonth();
      var cYear = today.getFullYear();
      var todayDate = new Date(cYear, cMonth, cDay);

      var birth = new Date(profileData.birthdate);
      var diff = Math.abs(todayDate - birth);
      const age = Math.floor(diff / 31536000000);
      setMaxHR(220-age);
    }
  });

  const calculateDuration = (arr) => {
    let totalDuration = 0;
    for (let i = 0; i < arr.length; i++) {
      totalDuration += arr[i].duration;
    }
    totalDuration = totalDuration.toFixed(2)
    return totalDuration;
  };
  const displayWorkouts = (arr) => {
    let workoutNames = "";
    for (let i = 0; i < arr.length; i++) {
      workoutNames =
        workoutNames + arr[i].workout.name + "\n";
    }
    return workoutNames;
  };
  const displayWorkoutsDur = (arr) => {
    let workoutDurs = "";
    for (let i = 0; i < arr.length; i++) {
      workoutDurs = workoutDurs + arr[i].duration.toFixed(2) + " min\n";
    }
    return workoutDurs;
  };

  const startWorkout = (routine) => {
    props.setCurrentRoutine(routine);
    props.navigation.navigate("WorkoutSession");
  };

  const renderProgramCards = () => {
    if (typeof props.routines !== "undefined") {
      return props.routines.map((routine) => (
        <View
          style={{
            width: screenWidth,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ ...styles.introCard }}>
            <Text
              style={{
                fontSize: 40,
                color: color2,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Welcome, {"\n\n"} {name.firstName} {name.lastName}
            </Text>
          </View>
          <View style={{ height: "65%" }}>
            <View style={styles.programCard}>
              <View style={{ flex: 2, alignItems: "center", marginTop: 20 }}>
                <Text style={{ fontSize: 36 }}>{routine.name}</Text>
                <Text style={{ fontSize: 25 }}>
                  Duration: {calculateDuration(routine.workouts)} Minutes
                </Text>
                <Text style={{ fontSize: 25 }}>
                  Target HR: {Math.round(maxHR*(routine.targetHeartrate*.01))} BPM 
                </Text>
              </View>
              <View style={{ flex: 4, marginHorizontal: "5%" }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginHorizontal: 15,
                  }}
                >
                  <Text style={{ fontSize: 24 }}>
                    {displayWorkouts(routine.workouts)}
                  </Text>
                  <Text style={{ fontSize: 24, borderLeftColor: "#000" }}>
                    {displayWorkoutsDur(routine.workouts)}
                  </Text>
                </View>
              </View>
            
        
      
              <View style={{ flex: 1, alignItems: "center" }}>
                <TouchableHighlight
                  style={{ ...styles.loginButton, width: "70%" }}
                  activeOpacity={0.2}
                  underlayColor={color2Dark}
                  onPress={() => startWorkout(routine)}
                >
                  <Text style={{ fontSize: 20, color: color3 }}>
                    Enter Workout
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
      ));
    } else {
      <Text>No Program</Text>;
    }
  };
  return (
    <ScrollView
      style={styles.scrollContainer}
      horizontal={true}
      pagingEnabled={true}
    >
      {renderProgramCards()}
    </ScrollView>
  );
}
const mapStateToProps = (store) => ({
  currentUser: store.subscriber.currentUser,
  profileData: store.subscriber.profileData,
  routines: store.subscriber.profileData.routines,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators(
    { loadSubToken, loadProfileData, setCurrentRoutine },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchProps)(Program);
