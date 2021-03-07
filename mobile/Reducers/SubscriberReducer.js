export const subActions ={
    getSubToken: 'GET_SUB_TOKEN',
    getSubTokenSuccess: 'GET_SUB_TOKEN_SUCCESS',
    getSubTokenFailed: 'GET_SUB_TOKEN_FAILED',
    getSubProfileData: 'GET_SUB_PROFILE_DATA',
    getSubProfileDataSuccess: 'GET_SUB_PROFILE_DATA_SUCCESS',
    updateWeight:'UPDATE_SUB_WEIGHT',
    updateWeightFailed:'UPDATE_SUB_WEIGHT_FAILED',
    getSubProfileDataFailed: 'GET_SUB_PROFILE_DATA_FAILED',
    getSearchResult:'GET_SEARCH_RESULT',
    getSearchResultFailed:'GET_SEARCH_RESULT_FAILED',
    clearState:'CLEAR_STATE',
    fetchedTrainer:'FETCHED_TRAINER',
    fetchedTrainerFailed:'FETCHED_TRAINER_FAILED',
    subscribe:'SUBSCRIBED',
    subscribeFailed:'SUBSCRIBED_FAILED',
    getWeights:'GET_WEIGHTS_FAILED',
    
    getWeightsFailed:'GET_WEIGHTS_FAILED'


 }
const initialSubState = {
    error: null,
    currentUser:null,
    profileData:[],
    trainer:[],
    loading:false,
    searchResult:[],
    weights:[]
    
}
const subscriberReducer = (state = initialSubState, action) =>
{
    switch(action.type)
    {
        case subActions.getSubToken:
            return{
                ...state,
                loading:true
            }
        case subActions.getSubTokenSuccess:
            return{
                ...state,
                loading:false,
                currentUser:action.payload
            }

        case subActions.getSubTokenFailed:
            return{
                ...state,
                loading:false,
                currentUser:action.payload
            }
            case subActions.getSubProfileData:
            return{
                ...state,
                loading:true
            }
            case subActions.getSubProfileDataSuccess:
            var p = action.payload
            var id = p._id
            return{
                ...state,
                loading:false,
                profileData:action.payload,
                currentUser:id
            }
            case subActions.getSubProfileDataFailed:
            return{
                ...state,
                loading:false,
                error:action.payload
            }

            case subActions.getSearchResult:
                
            return{
                ...state,                    
                searchResult:action.payload
                }
            case subActions.getSearchResultFailed:
            
            return{
                ...state,                    
                error: action.payload
                }
            case subActions.updateWeight:
                
            return{
                ...state,                    
             }
            case subActions.updateWeightFailed:
            
            return{
                ...state,  
                error:action.payload
                
                }
            case subActions.clearState:
                return{
                    initialSubState
                }
            case subActions.fetchedTrainer:
                   
            return{
                    ...state,
                    trainer:action.payload
                    
                }
            case subActions.fetchedTrainedFailed:
                 
                return{
                    ...state,
                    error:action.payload
                }
            case subActions.subscribe:
                
                return{
                    ...state,
                    
                }
            case subActions.subscribeFailed:
                
                return{
                    ...state,
                    error:action.payload
                } 
            case subActions.getWeights:
         
                return{
                    ...state,
                    weights:action.payload,
                    
                    
                }      
            case subActions.getWeightsFailed:
        
                return{
                    ...state,
                    error:action.payload
                }           
            
                
    }
    return state
}

export default subscriberReducer