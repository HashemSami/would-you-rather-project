import {SET_AUTHEDUSER} from '../actions/authedUser';

// a reducer for the authedUser part of the store
export default function authedUser(state = '', action){
    switch(action.type){
        case SET_AUTHEDUSER:
            return action.authedUser;
        default:
            return state;
    }
}
