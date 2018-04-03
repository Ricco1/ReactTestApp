import React from 'react';
import { shallow, mount } from 'enzyme';
import { imagesArray } from './data/fixtures';
import  { App } from './App';

const props = {
    images: [],
    isFetching: false,
    notifications: ''
};

describe('App', () => {
    let appWrapper = mount(<App {...props} />);

    it('renders the App', () => {
        expect(appWrapper).toMatchSnapshot();
    });

    describe('Image loader', () => {
        beforeEach(() => {
            appWrapper.setProps({images: [], isFetching: true, notifications: ''});
        });

        it('shows `Is Loading...` while images are fetching', () => {
            expect(appWrapper.find('.loader').exists()).toBe(true);
        })
    });

    describe('Notification bar', () => {
        beforeEach(() => {
            appWrapper.setProps({images: [], isFetching: false, notifications: 'Error message'});
        });

        it('shows Notification bar', () => {
            expect(appWrapper.find('NotificationBar').exists()).toBe(true)
        });

        it('shows Notification bar with message', () => {
            const noteBarText = appWrapper.find('NotificationBar .alert').text();
            expect(noteBarText.substring(0,noteBarText.length - 1)).toEqual('Error message');
        })
    });

    describe('and renders images', () => {
        beforeEach(() => {
            appWrapper.setProps({images: imagesArray, isFetching: false, notifications: ''});
        });

        it('with correct number of MB per page', () => {
           // console.log(appWrapper.state())
            const currentPage = appWrapper.state().paginationActivePage,
                maxImagesOnPage = appWrapper.state().imagesToShowInPage,
                startingIndex = (currentPage - 1) * maxImagesOnPage,
                imagesToSlice = maxImagesOnPage * currentPage,
                currentPageImg = imagesArray.slice(startingIndex, imagesToSlice);

            expect(appWrapper.find('.size-count').text()).toEqual(appWrapper.instance().calculatePictureSize(currentPageImg) + ' MB Total');
        });

        it('with correct number of pages', () => {
          //console.log(appWrapper.debug())
            expect(appWrapper.find('Pagination li a').length).toEqual(appWrapper.state().paginationPagesTotal);
        });

        it('with correct number of images', () => {
          expect(appWrapper.find('.img-container img').length).toEqual(appWrapper.state().imagesToShow.length)
        });
    });

    describe('when clicking the `Next` Pagination button', () => {
        beforeEach(() => {
            const nextButton = appWrapper.find('span.page-link').at(1);
            nextButton.simulate('click');
        });
        afterEach(() => {
            const prevButton = appWrapper.find('span.page-link').at(0);
            prevButton.simulate('click');
        });
        it('will render next Pagination page', () => {
            expect(appWrapper.state().paginationActivePage).toEqual(2);
            expect(appWrapper.find('.img-container img').length).toEqual(appWrapper.state().imagesToShow.length)
        });

        it('will have `active` class on pagination button with number 2', () => {
            expect(appWrapper.find('.page-item.active a').text()).toEqual('2');
        });
    });

    describe('when clicking non-active Pagination button', () => {
        beforeEach(() => {
            const secondButton = appWrapper.find('.pagination li.page-item').at(3);
            secondButton.simulate('click');
        });
        afterEach(() => {
            const firstButton = appWrapper.find('.pagination li.page-item').at(2);
            firstButton.simulate('click');
        });
        it('will select the appropriate page', () => {
            expect(appWrapper.find('.page-item.active a').text()).toEqual('2');
        });
    })
});