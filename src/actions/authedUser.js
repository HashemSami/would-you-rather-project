
import {_getUser} from '../utils/_DATA';
export const SET_AUTHEDUSER = 'SET_ATHEDUSER';

// action for sitting the AuthedUser
function setAuthedUser(authedUser){
    return {
        type: SET_AUTHEDUSER,
        authedUser,
    }
}

export function handleSetAuthedUser(id){
    return (dispatch) => {
        return _getUser(id).then((authedUser) => {
            dispatch(setAuthedUser(authedUser.id));
        })
    }
}