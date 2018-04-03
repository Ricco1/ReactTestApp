import * as types from '../constants/getImageType';
import * as notificationTypes from '../constants/notiticationType';
import * as actions from './getImages';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { imagesData, imagesArray } from '../data/fixtures';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();

window.fetch = jest.fn();

// Helper to mock a success response (only once)
fetch.mockResponseSuccess = (body) => {
    fetch.mockImplementationOnce (
        () => Promise.resolve({json: () => {
                // console.log('body', body);
                // Promise.resolve(body)
                return body;
        }})
    );
};

// Helper to mock a failure response (only once)
fetch.mockResponseFailure = (error) => {
    fetch.mockImplementationOnce(
        () => Promise.reject(error)
    );
};

describe('getImages actions', () => {

    it('creates an action to getImages and handles `FETCH_IMAGES`', async () => {
        const images = imagesArray;
        const response = { payload: images, type: types.FETCH_IMAGES };

        fetch.mockResponseSuccess(imagesData);
        await store.dispatch(actions.getImagesAction());
        const storeActions = store.getActions();
        expect(storeActions[2]).toEqual(response)
    });

    it('creates an action to getImages and handles `SHOW_NOTIFICATION`', async () => {
        const response = { payload: 'Something went wrong', type: notificationTypes.SHOW_NOTIFICATION };
        const mockError = new Error('Something went wrong');
        fetch.mockResponseFailure(mockError);
        await store.dispatch(actions.getImagesAction());
        const storeActions = store.getActions();
        expect(storeActions[5]).toEqual(response);
    });

    it('creates an action to initialize loader', () => {
        const expectedAction = {
            type: types.FETCHING,
            payload: true
        };

        expect(actions.initLoader()).toEqual(expectedAction);
    });

    it('creates an action to hide loader', () => {
        const expectedAction = {
            type: types.FETCHING,
            payload: false
        };

        expect(actions.hideLoader()).toEqual(expectedAction);
    });
});
