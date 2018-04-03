import React from 'react';
import { mount } from 'enzyme';
import Pagination from './Pagination';

let props = {
    pagesTotal: 4,
    currentPage: 1
};

describe('Pagination', () => {
    const paginationWrapper = mount(<Pagination {...props} />);

    it('renders component with four page items', () => {
        expect(paginationWrapper.find('li a').length).toBe(4)
    });

    it('will render prev button as disabled', () => {
        expect(paginationWrapper.find('li').at(0).hasClass('disabled')).toBe(true)
    });
});