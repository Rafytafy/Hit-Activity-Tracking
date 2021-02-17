import {FETCH_CURRENT_USER, FETCH_CLIENTS} from '../constants/index';
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