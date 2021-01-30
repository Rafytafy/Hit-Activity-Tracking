export const SigningInActions ={
    getSubToken: 'SIGN_IN_GET_SUB_TOKEN',
    getSubTokenFailed: 'SIGN_IN_GET_SUB_TOKEN_FAILED'
 }
const initialSignUpState = {
    error: null,
    currentUserToken:null
}
const signInReducer = (state = initialSignUpState, action) =>
{
    switch(action.type)
    {
        case SigningInActions.getSubToken:
            return{
                ...state,
                currentUserToken:action.payload
            }
        case SigningInActions.getSubTokenFailed:
            return{
                ...state,
                currentUserToken:action.payload
            }
    }
    return state
}

export default signInReducer