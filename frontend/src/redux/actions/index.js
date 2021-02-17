import {FETCH_CLIENTS} from '../constants/index';
import axios from 'axios';

export function fetchClients(){
    return((dispatch) => {
        axios.get('http://localhost:5000/trainer/subscribers/UuZEdSMTPMTTPREacyK2oqVtQ142')
        .then((res) => {
            dispatch({type: FETCH_CLIENTS, clientList: res.data})
        })
    })
}