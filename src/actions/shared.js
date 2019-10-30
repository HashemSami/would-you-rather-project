import {_getUsers, _getQuestions} from '../utils/_DATA';
import {showLoading, hideLoading} from 'react-redux-loading';
export const RECIEVE_DATA ='RECIEVE_DATA';
export const SET_NAV = 'SET_NAV';

function getInitialData (users, questions){
    return {
        type: RECIEVE_DATA,
        users,
        questions,
    }
}

export function handleInitialData(){
    return (dispatch) => {
        dispatch(showLoading());
        return Promise.all([_getUsers(), _getQuestions()])
          .then(([users, questions]) => {
              dispatch(getInitialData(users, questions));
              dispatch(hideLoading());
          })
    }
}

export function setNav(onOff){
    return{
        type: SET_NAV,
        onOff,
    }
}