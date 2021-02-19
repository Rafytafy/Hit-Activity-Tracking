import {FETCH_CURRENT_USER, FETCH_CLIENTS, FETCH_WORKOUTS, POST_WORKOUT, DELETE_WORKOUT, UPDATE_WORKOUT} from '../constants/index';
import firebase from 'firebase'
import axios from 'axios';

export function fetchCurrentUser() {
    return (async (dispatch) => {
        const uid = await firebase.auth().currentUser.uid
        axios.get(`http://localhost:5000/trainer/${uid}`)
        .then((res) => {
            dispatch({type: FETCH_CURRENT_USER, userData: res.data})
        })
    })
}

export function fetchClients(uid){
    return((dispatch) => {
        axios.get(`http://localhost:5000/trainer/subscribers/${uid}`)
        .then((res) => {
            dispatch({type: FETCH_CLIENTS, clientList: res.data})
        })
    })
}

export function fetchWorkouts(){
    return((dispatch) => {
        axios.get(`http://localhost:5000/workout/`)
        .then((res) => {
            dispatch({type: FETCH_WORKOUTS, workoutList: res.data})
        })
    })
}

export function postWorkouts(newWorkout){
    return((dispatch) => {
        axios.post(`http://localhost:5000/workout/`, newWorkout)
        .then((res) => {
            dispatch({type: POST_WORKOUT, workoutList: res.data})
        })
    })
}

export function deleteWorkout(deletedWorkout){
    return((dispatch) => {
        axios.delete(`http://localhost:5000/workout/${deletedWorkout._id}`)
        .then((res) => {
            dispatch({type: DELETE_WORKOUT, workout: deletedWorkout})
        })
    })
}

export function updateWorkout(updatedWorkout){
    return((dispatch) => {
        axios.put(`http://localhost:5000/workout/${updatedWorkout._id}`, updatedWorkout)
        .then((res) => {
            dispatch({type: UPDATE_WORKOUT, workout: updatedWorkout})
        })
    })
}