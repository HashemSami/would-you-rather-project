import {RECIEVE_DATA} from '../actions/shared';
import {SAVE_ANSWER, NEW_QUESTION} from '../actions/questions';

// a reducer for the users part of the store
export default function users (state={}, action){
    switch(action.type){
        case RECIEVE_DATA:
            return {
                ...state,
                ...action.users
            };

        case SAVE_ANSWER:
                const {authedUser, qid, answer, time} = action.answer;
            return { 
                ...state,
                [authedUser] : {
                    ...state[authedUser],
                    answers : {
                        ...state[authedUser].answers,
                        [qid] : {
                            ...state[authedUser].answers[qid],    
                            answer: answer,
                            timestamp: time
                        }
                    }
                }
            }

        case NEW_QUESTION:
            const {author, id} = action.question;
            return {
                ...state,
                [author] : {
                    ...state[author],
                    questions : 
                    state[author].questions.concat([id])
                }
            }
        default:
            return state;
    }
}