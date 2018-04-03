import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getImagesAction } from "./actions/getImages";
import { hideNotification } from "./actions/notifications";
import PropTypes from 'prop-types';
import Pagination from './components/Pagination';
import NotificationBar from './components/NotificationBar';
import logo from './logo.svg';
import './App.css';

const List = ({image}) => (
    <div className='col-3 img-container'>
        <img className='img-fluid' src={image.images.fixed_height_still.url} alt="gif"/>
    </div>
);

export class App extends PureComponent {
    static propTypes = {
        images: PropTypes.array
    };

    static defaultProps = {
        images: [],
        isFetching: false,
        notifications:""
    };

    constructor() {
        super();

        this.state = {
            imagesToShow: [],
            imagesToShowInPage: 8,
            paginationActivePage: 1,
            paginationPagesTotal: 0,
            totalMbs: 0
        };

        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.selectPage = this.selectPage.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.switchPage(nextProps, this.state)
    }

    switchPage(props, state, direction, page) {
        if(props.images.length) {
            const {paginationActivePage, imagesToShowInPage} = state;
            let paginationPagesTotal = Math.ceil(props.images.length / imagesToShowInPage),
                increment,
                targetPage,
                totalMbs;

            increment = direction ? (direction === 'next' ? 1 : -1) : 0;
            targetPage = page ? page : paginationActivePage + increment;

            if(targetPage > paginationPagesTotal || targetPage < 1) return;


            let startingIndex = (targetPage - 1) * imagesToShowInPage,
                imagesToSlice = (startingIndex + imagesToShowInPage) < props.images.length  ?
                                startingIndex + imagesToShowInPage :
                                (startingIndex > props.images.length) ? 0 : props.images.length,

                imagesToShow = props.images.slice(startingIndex, imagesToSlice);

            totalMbs = this.calculatePictureSize(imagesToShow);

            this.setState({
                imagesToShow,
                paginationPagesTotal,
                paginationActivePage: targetPage,
                totalMbs
            });
        }
    }

    calculatePictureSize(imageArray) {
        let size = 0,
            currentImageSize = 0,
            byteInMB = 0.00000095367432;

        for(let j = 0, jlen = imageArray.length; j < jlen; j++) {
            currentImageSize = imageArray[j].images.fixed_height_still.size ? +imageArray[j].images.fixed_height_still.size : 0;
            size += currentImageSize;
        }

        return size * byteInMB;
    }

    nextPage() {
        const {props, state} = this;
        this.switchPage(props, state, 'next')
    }

    prevPage() {
        const {props, state} = this;
        this.switchPage(props, state, 'prev')
    }

    selectPage(e,pageNumber) {
        e && e.preventDefault();
        const {props, state} = this;
        if(pageNumber === state.paginationActivePage) return;
        this.switchPage(props, state, null, pageNumber);
    }

    render() {
        const {imagesToShow, paginationPagesTotal, paginationActivePage, totalMbs} = this.state;
        const {onGetImagesClick, notifications, hideNotification} = this.props;
        return (
            <div className="App">
                {notifications.length ? <NotificationBar notification={notifications} hide={hideNotification} /> : ''}
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React!!</h1>
                </header>
                <p className="App-intro mt-2 mb-2">
                    <button onClick={onGetImagesClick}>Get images</button>
                </p>
                { this.props.isFetching ? <p className='loader text-center'>Loading...</p> : '' }
                <div className='container'>
                    {
                        imagesToShow.length > 0 ?
                            <div className='row'>
                                <div className='col d-flex align-items-center'>
                                    <div className='size-count mr-auto'>{totalMbs} MB Total</div>
                                    <Pagination pagesTotal={paginationPagesTotal} currentPage={paginationActivePage} nextPage={this.nextPage} prevPage={this.prevPage} selectPage={this.selectPage} />
                                </div>
                            </div> : ''
                    }
                    <div className='row'>
                        { imagesToShow.map((image, i) => <List key={i} image={image} /> )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({images, isFetching, notifications}) => ({
    images,
    isFetching,
    notifications
});

const mapDispatchToProps = {
    onGetImagesClick: getImagesAction,
    hideNotification
};

export default connect(mapStateToProps,mapDispatchToProps)(App);
