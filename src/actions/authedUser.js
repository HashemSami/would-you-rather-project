
import {_getUser} from '../utils/_DATA';
export const SET_AUTHEDUSER = 'SET_ATHEDUSER';
export const LOGOUT = 'LOGOUT'

// action for sitting the AuthedUser
function setAuthedUser(authedUser){
    return {
        type: SET_AUTHEDUSER,
        authedUser,
    }
}

export function logOut(){
    return{
        type: LOGOUT,
        authedUser: null
    }
}

export function handleSetAuthedUser(id){
    return (dispatch) => {
        return _getUser(id).then((authedUser) => {
            dispatch(setAuthedUser(authedUser.id));
        })
    }
}