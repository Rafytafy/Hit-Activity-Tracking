import React, {useState} from 'react'
import { View, Text, Button } from 'react-native'
import { connect } from 'react-redux'
import CountDown from 'react-native-countdown-component';

import styles from "../../../styles";

function WorkoutSession(props) {
    const [isWorkoutSessionStarted, setIsWorkoutSessionStarted] = useState(false),
          [workoutName, setWorkoutName] = useState(''),
          [workoutDuration, setWorkoutDuration] = useState(props.routine.workouts[0].duration * 60),
          [currentIterationOfSession, setCurrentIterationOfSession] = useState(0),
          [idOfWorkout, SetIdOfWorkout] = useState('0')
          
    const startWorkout = () => {
        setIsWorkoutSessionStarted(true)
        setWorkoutName(props.routine.workouts[0].workout.name)
        
        
    }

    const beginSession = async () => {
        // iterate through elements of array
        for(let i = 0; i < props.routine.workouts.length; i++){
            // Display workout name
            console.log(i)
            await workout(props.routine.workouts[i]);
            
            //Display image of workout (LOW PRIO)
            //Display working timer 
            console.log("Hello from new function")
    
        }

    
    }

    const workout = async (item) => {
        return new Promise((resolve) => {
            setWorkoutName(item.workout.name)
            setWorkoutDuration(item.duration * 60)
            setTimeout(async () => {

            console.log(`Duration: ${item.duration}`)
                console.log(item)
                resolve('success')
            }, item.duration * 1000)
            
        })
        

    }

    const setNextWorkout = () => {
        console.log(props.routine.workouts.length)
        console.log(currentIterationOfSession + 1)
        if(props.routine.workouts.length !== currentIterationOfSession + 1){
            setCurrentIterationOfSession(currentIterationOfSession + 1)
            setWorkoutDuration(props.routine.workouts[currentIterationOfSession + 1].duration * 60)
            setWorkoutName(props.routine.workouts[currentIterationOfSession + 1].workout.name)
            SetIdOfWorkout(props.routine.workouts[currentIterationOfSession + 1].workout._id)
        }
        else{
            alert("Session complete")
        }
        
    }

    return (

        <View style={{
            marginTop: 50,
            justifyContent: "center",
            alignItems: "center",
        }}>
            {!isWorkoutSessionStarted ? 
            (<Button 
                title="Start"
                onPress={() => startWorkout()}
            />) 
            
            :   
            <View>
                <Text>{workoutName}</Text>
                <CountDown
                    id={idOfWorkout}
                    until={workoutDuration}
                    onPress={() => alert('hello')}
                    size={20}
                    timeToShow={['M', 'S']}
                    onFinish={() => setNextWorkout()}
                />
            </View>
            }
            
        </View>
    )
}

const mapStateToProps = (store) => ({
    routine: store.subscriber.currentRoutine
  });

export default connect(mapStateToProps, null)(WorkoutSession)