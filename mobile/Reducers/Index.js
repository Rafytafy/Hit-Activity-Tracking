import {combineReducers} from 'redux'
import subscriberReducer from './SubscriberReducer'




const rootReducer = combineReducers({
    subscriber: subscriberReducer
})


export default rootReducer