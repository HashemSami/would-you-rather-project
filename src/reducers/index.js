import {combineReducers} from 'redux';
import users from './users';
import questions from './questions';
import authedUser from './atheduser';
import nav from './nav';
import {loadingBarReducer} from 'react-redux-loading';

export default combineReducers ({
    users,
    questions,
    authedUser,
    nav,
    loadingBar: loadingBarReducer,
});