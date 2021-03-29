import React, { useState } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  Alert,
  Image,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import CountDown from "react-native-countdown-component";
import firebase from "firebase";
import styles, {
  color2Dark,
  color3,
  color2,
  color1Dark,
  color1,
} from "../../../styles";
import axios from "axios";
const width = Dimensions.get("screen").width;
function WorkoutSession(props) {
  const [isWorkoutSessionStarted, setIsWorkoutSessionStarted] = useState(false),
    [workoutName, setWorkoutName] = useState(""),
    [workoutDuration, setWorkoutDuration] = useState(
      props.routine.workouts[0].duration * 60
    ),
    [workoutImageUrl, setWorkoutImageUrl] = useState(),
    [currentIterationOfSession, setCurrentIterationOfSession] = useState(0),
    [idOfWorkout, SetIdOfWorkout] = useState("0"),
    [curWorkoutNum, setCurWorkoutNum] = useState(1),
    [startTime, setStartTime] = useState('');

  const startWorkout = () => {
    var today = new Date();
    setStartTime(`${today.getHours().toString()}:${today.getMinutes().toString()}`)
    setIsWorkoutSessionStarted(true);
    setWorkoutName(props.routine.workouts[0].workout.name);
    let image = props.routine.workouts[0].workout.imageURL;
    console.log(image);

    setWorkoutImageUrl(image);
  };

  const beginSession = async () => {
    // iterate through elements of array
    for (let i = 0; i < props.routine.workouts.length; i++) {
      // Display workout name
      console.log(i);
      await workout(props.routine.workouts[i]);

      //Display image of workout (LOW PRIO)
      //Display working timer
      console.log("Hello from new function");
    }
  };

  const workout = async (item) => {
    return new Promise((resolve) => {
      setWorkoutName(item.workout.name);
      setWorkoutDuration(item.duration * 60);
      setTimeout(async () => {
        console.log(`Duration: ${item.duration}`);
        console.log(item);
        resolve("success");
      }, item.duration * 1000);
    });
  };

  const setNextWorkout = () => {
    if (props.routine.workouts.length !== currentIterationOfSession + 1) {
      setCurWorkoutNum(curWorkoutNum + 1);
      let image = props.routine.workouts[currentIterationOfSession + 1].workout.imageURL;
      console.log(image);
      console.log('next')

      setWorkoutImageUrl(image);
      setCurrentIterationOfSession(currentIterationOfSession + 1);
      setWorkoutDuration(
        props.routine.workouts[currentIterationOfSession + 1].duration * 60
      );
      setWorkoutName(
        props.routine.workouts[currentIterationOfSession + 1].workout.name
      );
      SetIdOfWorkout(
        props.routine.workouts[currentIterationOfSession + 1].workout._id
      );
    } else {
        if(props.profileData.accessToken !== undefined){

        
          var today = new Date();
          endTime = `${today.getHours().toString()}:${today.getMinutes().toString()}`
          axios.post('http://10.0.0.249:5000/workoutSession', 
          {
            access_token: props.profileData.accessToken,
            start: startTime,
            end: endTime,
            id: props.currentUser,
            routine: props.routine._id
          })
          Alert.alert("Session Completed", "Keep up the good work!", [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
        }
        else {
          Alert.alert("Session Completed", "Connect to a Fitbit to record heart rate", [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
        }
    }
  };

  return (
    <View
      style={{
        ...styles.landContainer,
      }}
    >
      {!isWorkoutSessionStarted ? (
        <View>
<View style={{flex:3, justifyContent:'space-between',marginTop:70,marginBottom:40, alignItems:'center'}}
>
<Text style={{color:color3, fontSize:80,fontWeight:'900' }}>
  Are  
</Text>
<Text style={{color:color3, fontSize:80,fontWeight:'900' }}>
  You  
</Text>
<Text style={{color:color3, fontSize:80,fontWeight:'900' }}>
  Ready ? 
</Text>



  </View>
<View style={{flex:1}}>
  </View>

          <View style={{flex:2}}>
          <TouchableHighlight
            style={{ ...styles.loginButton, width:300,height:150,}}
            activeOpacity={0.2}
            underlayColor={color2Dark}
            onPress={() => startWorkout()}
          >
          
            
   <View>
   <Text style={{ fontSize: 32, color: color3,textAlign:'center',fontWeight:'bold' }}>Begin</Text>
   <Text>

   </Text>
   <Text style={{ fontSize: 32, color: color3,textAlign:'center',fontWeight:'bold' }}>Workout</Text>
   </View>

        
           
    
          </TouchableHighlight>

          </View>
         
        </View>
      ) : (
        <View style={{ alignItems: "center" }}>
          <View style={{ ...styles.workoutCard }}>
            <View style={{ justifyContent: "center", flex: 1 }}>
              <Text style={{ fontSize: 30, color: color2 }}>
                {props.routine.name}:
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 30, color: color2 }}>
                Exercise {curWorkoutNum}
              </Text>
            </View>
            <View style={{ flex: 2,justifyContent:'center' }}>
              <Text style={{ fontSize: 50, color: color2 }}>{workoutName}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 30, color: color2 }}>
                {workoutDuration} Seconds
              </Text>
            </View>
          </View>
          <View style={{ flex: 3 }}>
            <Image
              source={{ uri: workoutImageUrl }}
              style={{
                height: 250,
                width: width * 0.9,
                borderRadius: 25,
                marginBottom: 30,
              }}
            />
          </View>
          <View style={{ ...styles.timerCard }}>
            <CountDown
              id={idOfWorkout}
              until={workoutDuration}
              S
              size={60}
              timeToShow={["M", "S"]}
              onFinish={() => setNextWorkout()}
              digitStyle={{ backgroundColor: color2 }}
              digitTxtStyle={{ color: color3 }}
              timeLabelStyle={{ color: color2 }}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const mapStateToProps = (store) => ({
  routine: store.subscriber.currentRoutine,
  currentUser: store.subscriber.currentUser,
  profileData: store.subscriber.profileData
});

export default connect(mapStateToProps, null)(WorkoutSession);
