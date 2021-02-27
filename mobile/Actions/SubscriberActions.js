import {subActions} from '../Reducers/SubscriberReducer'
import firebase from 'firebase'
import axios from 'axios'

export function loadSubToken(){
    return((dispatch)=>{
        dispatch({type:subActions.getSubToken})
  
        firebase.auth().currentUser.getIdToken(true)
        .then((res) => {
            
            dispatch({type: subActions.getSubTokenSuccess, payload:res})

            })
        .catch((err)=>
        {
            dispatch({type: subActions.getSubTokenFailed, payload:err})
        })
    })
}


export function loadProfileData(){
    return((dispatch)=>{
        dispatch({type:subActions.getSubProfileData})
        firebase.auth().currentUser.getIdToken(true)
        .then((res) => {
            console.log(res)
            var tokenId=res
            axios.post(`http://localhost:5000/subData/getProfileData`,{tokenId})
            .then(res =>
            {
                console.log(res)
                
            
                dispatch({type:subActions.getSubProfileDataSuccess,payload:res.data})
            })
            .catch(err =>
            {
                dispatch({type:subActions.getSubProfileDataFailed,payload:err})
            })
        })
        .catch((err)=>
        {
            dispatch({type: subActions.getSubTokenFailed, payload:err})
        })
        
    })
}

export function fetchTrainers(search){
    
    return((dispatch) => {
        axios.get(`http://localhost:5000/subscriber/trainers/${search}`)
        .then((res) => {
            dispatch({type: subActions.getSearchResult, payload:res.data})
        })
        .catch((err)=>{
            dispatch({type: subActions.getSearchResultFailed, payload:err})
        })
    })
}
export function addWeight(weight){
    
    return((dispatch)=>{
        axios.put(`http://localhost:5000/subscriber/addWeight/${weight.id}`,weight)
        .then((res) => {
            dispatch({type: subActions.updateWeight})
            console.log(res)

        })
        .catch((err)=>{
            dispatch({type: subActions.updateWeightFailed, payload:err})
        })
    })
    
}

















