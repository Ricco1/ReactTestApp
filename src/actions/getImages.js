import * as types from '../constants/getImageType';
import * as notificationActions from './notifications';


export function getImagesAction() {
    const request = fetch('http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC');
    return(dispatch) => {

        dispatch(initLoader());
        return request.then(res => {
            return res.json()
        })
        .then(json => {
            dispatch(hideLoader());
            return dispatch({
                type: types.FETCH_IMAGES,
                payload: json.data
            })
        })
        .catch(error => {
            dispatch(hideLoader());
            dispatch(notificationActions.showNotification(error.message))
        })
    }
}

export function initLoader() {
    return {
        type: types.FETCHING,
        payload: true
    }
}

export function hideLoader() {
    return {
        type: types.FETCHING,
        payload: false
    }
}