
export const SET_AUTHEDUSER = 'SET_ATHEDUSER';

// action for sitting the AuthedUser
export function setAuthedUser(authedUser){
    return {
        type: SET_AUTHEDUSER,
        authedUser,
    }
}