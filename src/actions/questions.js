import {_saveQuestionAnswer, _saveQuestion} from '../utils/_DATA';

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


export function handleSaveAnswer(answer){
    return (dispatch) => {
        // dispatch(saveAnswer(answer))
        return _saveQuestionAnswer(answer)
            .then((err) =>{
                // add a save question function later with the catch
                dispatch(saveAnswer(answer))
            }
        )
    }
}

export function handleNewQuestion(question, clearValues){
    return(dispatch) => {
        return _saveQuestion(question).then((formatedQuestion) => {
            dispatch(newQuestion(formatedQuestion));
            clearValues();
        }).catch((err) => {
            alert("Sorry, Your question hasn't been saved, please try again.")
            console.log(err);
        })
    }
}
