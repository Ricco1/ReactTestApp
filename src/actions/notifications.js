import * as types from '../constants/notiticationType';

export function showNotification(message) {
    return (dispatch) => {
        return dispatch({
            type: types.SHOW_NOTIFICATION,
            payload: message
        })
    }
}

export function hideNotification() {
    return (dispatch) => {
        return dispatch({
            type: types.HIDE_NOTIFICATION,
            payload: ''
        })
    }
}