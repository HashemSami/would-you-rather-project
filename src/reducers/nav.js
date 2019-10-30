import {SET_NAV} from '../actions/shared';

export default function (state=false, action){
    switch(action.type){
        case SET_NAV:
            return action.onOff;
        default:
            return state;
    }
}