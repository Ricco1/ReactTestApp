import * as reducers from './index';
import * as types from '../constants/getImageType';
import * as notificationTypes from '../constants/notiticationType';


describe('test `images` reducer', ()=> {
    const actionResp = {
        type: types.FETCH_IMAGES,
        payload: [{data: []},{data: []}]
    };

    it('will return empty state as initial state', () => {
        expect(reducers.images(undefined, {})).toEqual([]);
    });

    it('sets images', () => {
        expect(reducers.images([], actionResp)).toEqual(actionResp.payload);
    });
});

describe('test `fetching` reducer', ()=> {
    const actionResp = {
        type: types.FETCHING,
        payload: true
    };

    it('will return `false` as initial state', () => {
        expect(reducers.fetching(undefined, {})).toEqual(false);
    });

    it('will return `true`', () => {
        expect(reducers.fetching(true, actionResp)).toEqual(actionResp.payload);
    });
});

describe('test `notifications` reducer', ()=> {

    it('will return empty string as initial state', () => {
        expect(reducers.notifications(undefined, {})).toEqual('');
    });

    it('will return populated string as updated state in case of `SHOW_NOTIFICATION` action', () => {
        const actionResp = {
            type: notificationTypes.SHOW_NOTIFICATION,
            payload: 'Some kind of notification message'
        };
        expect(reducers.notifications('', actionResp)).toEqual(actionResp.payload);
    });

    it('will return empty string as updated state in case of `HIDE_NOTIFICATION` action', () => {
        const actionResp = {
            type: notificationTypes.HIDE_NOTIFICATION,
            payload: ''
        };
        expect(reducers.notifications('', actionResp)).toEqual(actionResp.payload);
    });
});