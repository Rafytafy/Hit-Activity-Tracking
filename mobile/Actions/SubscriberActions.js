import {subActions} from '../Reducers/SubscriberReducer'
import firebase from 'firebase'


const callforSubProfileData = (dispatch,tokenId,success,failure) =>
{
    axios.get(`http://localhost:5000/subData/getProfileData?tokenId=${tokenId}`)
    .then(res =>
        {
            dispatch({type:success,payload:res})
        })
    .catch(err =>
        {
            dispatch({type:failure,payload:err})
        })

}
export const loadSubToken= () => {
    return((dispatch) => {  
        firebase.auth().currentUser.getIdToken(true)
            .then((res) => {
                console.log(res)
                console.log('dddd')
                console.log(res.data)
                console.log('ddddffff')
                console.log(res.data())
                dispatch({type: subActions.getSubToken, payload:res})
  
             })
            .catch((err)=>
            {
                dispatch({type: subActions.getSubTokenFailed, payload:err})
            })
    })
}

export const loadProfileData = dispatch => tokenId =>
{
    dispatch({type:subActions.getSubProfileData})
    return callforSubProfileData (dispatch,tokenId,subActions.getSubProfileDataSuccess,subActions.getSubTokenFailed)
}

