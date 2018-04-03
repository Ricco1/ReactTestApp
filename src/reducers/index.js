import * as types from '../constants/getImageType';
import * as notificationTypes from '../constants/notiticationType';

export function images(state = [], action){
    const { type, payload } = action;

    switch (type){
        case types.FETCH_IMAGES:
            return payload;
        default:
            return state;
    }
}

export function fetching(state = false, action) {
    const { type, payload } = action;

    switch (type){
        case types.FETCHING:
            return payload;
        default:
            return state;
    }
}

export function notifications(state = '', action) {
    const { type, payload } = action;
    
    switch (type) {
        case notificationTypes.SHOW_NOTIFICATION:
        case notificationTypes.HIDE_NOTIFICATION:
            return payload;
        default:
            return state;
    } 
}