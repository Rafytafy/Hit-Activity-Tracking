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
           
            var tokenId=res
            axios.post(`http://10.0.0.9:5000/subData/getProfileData`,{tokenId})
            .then(res =>
            {
            
                
            
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
        axios.get(`http://10.0.0.9:5000/subscriber/trainers/${search}`)
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
        axios.put(`http://10.0.0.9:5000/subscriber/addWeight/${weight.id}`,weight)
        .then((res) => {
            dispatch({type: subActions.updateWeight,payload:'Weight Added'})
            console.log(res)

        })
        .catch((err)=>{
            dispatch({type: subActions.updateWeightFailed, payload:err})
        })
    })
    
}
export function clearSearch(){
    
    return((dispatch)=>{
     
            dispatch({type: subActions.clearSearch})
      
      
    })
    
}
export function fetchTrainer(name){
    
    return((dispatch)=>{
        axios.get(`http://10.0.0.9:5000/subscriber/getTrainer/?first=${name.first}&last=${name.last}` )      
        .then((res) => {
            
            dispatch({type: subActions.fetchedTrainer,payload:res.data[0]})
            

        })
        .catch((err)=>{
            dispatch({type: subActions.fetchedTrainerFailed, payload:err})
        })
    })
}

export function subscribe(subPair){
    console.log(subPair)
    return((dispatch)=>{
    axios.put(`http://10.0.0.9:5000/subscriber/subcribeToTrainer/`,subPair)
    .then((res)=>{
        dispatch({type:subActions.subscribe, payload:'You are now Subscribed' })
    })
    .catch((err)=>{
        dispatch({type: subActions.subscribeFailed, payload:err})
    })
})
}
export function getWeights(id){
    return((dispatch)=>{
        axios.get(`http://10.0.0.9:5000/subscriber/getWeights/${id}` )      
        .then((res) => {
            console.log(res)
            dispatch({type: subActions.getWeights ,payload:res.data})
            

        })
        .catch((err)=>{
            dispatch({type: subActions.getWeightsFailed, payload:err})
        })
    })
}












