import {combineReducers} from 'redux'
import signInReducer from './SigningIn'



 const rootReducer = combineReducers({
    signIn: signInReducer})


export default rootReducer