import {_saveQuestionAnswer, _saveQuestion} from '../utils/_DATA';
import {showLoading, hideLoading} from 'react-redux-loading';

export const SAVE_ANSWER = 'SAVE_ANSWER';
export const NEW_QUESTION = 'NEW_QUESTION';

function saveAnswer(answer){
    return{
        type: SAVE_ANSWER,
        answer,
    }
}

function newQuestion(question){
    return{
        type : NEW_QUESTION,
        question,
    }
}

// __________________________________________________
// asynchronous data handling 
export function handleSaveAnswer(answer){
    return (dispatch) => {
        return _saveQuestionAnswer(answer)
            .then(() =>{
                dispatch(saveAnswer(answer))
            }
        )
    }
}

export function handleNewQuestion(question, clearValues){
    return(dispatch) => {

        dispatch(showLoading());

        return _saveQuestion(question).then((formatedQuestion) => {
            dispatch(newQuestion(formatedQuestion));
            clearValues();
            dispatch(hideLoading());
        }).catch((err) => {
            alert("Sorry, Your question hasn't been saved, please try again.")
            console.log(err);
        })
    }
}
