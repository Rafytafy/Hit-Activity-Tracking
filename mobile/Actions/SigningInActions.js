import {SigningInActions} from '../Reducers/SigningIn.js'
import firebase from 'firebase'

export const loadSubToken= () => {
    return((dispatch) => {  
        firebase.auth().currentUser.getIdToken(true)
            .then((res) => {
                dispatch({type: SigningInActions.getSubToken, payload:res.data()})
  
     })
     .catch((err)=>
     {
        dispatch({type: SigningInActions.getSubTokenFailed, payload:err})
     })
})
}

