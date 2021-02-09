export const subActions ={
    getSubToken: 'GET_SUB_TOKEN',
    getSubTokenFailed: 'GET_SUB_TOKEN_FAILED',
    getSubProfileData: 'GET_SUB_PROFILE_DATA',
    getSubProfileDataSuccess: 'GET_SUB_PROFILE_DATA_SUCCESS',
    getSubProfileDataFailed: 'GET_SUB_PROFILE_DATA_FAILED'
 }
const initialSubState = {
    error: null,
    currentUser:null,
    profileData:null,
    loading:false
    
}
const subscriberReducer = (state = initialSubState, action) =>
{
    switch(action.type)
    {
        case subActions.getSubToken:
            return{
                ...state,
                currentUser:action.payload
            }
        case subActions.getSubTokenFailed:
            return{
                ...state,
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
                error:action.payload
            }
    }
    return state
}

export default subscriberReducer