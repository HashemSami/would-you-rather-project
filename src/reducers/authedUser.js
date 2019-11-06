import {SET_AUTHEDUSER, LOGOUT} from '../actions/authedUser';

// a reducer for the authedUser part of the store
export default function authedUser(state = null, action){
    switch(action.type){
        case SET_AUTHEDUSER:
            const authedUser =action.authedUser
            return authedUser;
        case LOGOUT:
            return action.authedUser;
        default:
            return state;
    }
}
