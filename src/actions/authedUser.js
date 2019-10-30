
export const SET_AUTHEDUSER = 'SET_ATHEDUSER';

export function setAuthedUser(authedUser){
    return {
        type: SET_AUTHEDUSER,
        authedUser,
    }
}