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
    clearSearch:'CLAER_SEARCH',
    fetchedTrained:'FETCHED_TRAINER',
    fetchedTrainerFailed:'FETCHED_TRAINER_FAILED'


 }
const initialSubState = {
    error: null,
    currentUser:null,
    profileData:[],
    trainerInfo:[],
    loading:false,
    searchResult:[]

    
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
            return{
                ...state,
                loading:false,
                profileData:action.payload
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
            case subActions.clearSearch:
                return{
                    ...state,
                    searchResult:[]
                }
            case subActions.fetchedTrained:
                console.log(action.payload)    
            return{
                    ...state,
                    trainer:action.payload
                    
                }
            case subActions.fetchedTrained:
                console.log(action.payload)  
                return{
                    ...state,
                    error:action.payload
                }

    }
    return state
}

export default subscriberReducer