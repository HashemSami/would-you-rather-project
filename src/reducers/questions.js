import {RECIEVE_DATA} from '../actions/shared';
import {SAVE_ANSWER, NEW_QUESTION} from '../actions/questions';

// a reducer for the questions part of the store
export default function questions (state={}, action){
    switch(action.type){
        case RECIEVE_DATA:
            return {
                ...state,
                ...action.questions
            }
        case SAVE_ANSWER:
            const {authedUser, qid, answer} = action.answer
            return{
                ...state,
                [qid] : {
                    ...state[qid],
                    [answer] : {
                        ...state[qid][answer],
                        votes : state[qid][answer].votes.concat([authedUser])
                    }
                }
            }
        case NEW_QUESTION:
            return {
                ...state,
                [action.question.id] : action.question,
            }
        default:
            return state;
    }
}