import React from 'react';
import PropTypes from 'prop-types';


const NotificationBar = (props) => {
    const {notification, hide} = props;
    return (
        <div className="alert alert-danger" role="alert">
            {notification}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={hide}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    );

};

NotificationBar.propTypes = {
    notification: PropTypes.string,
    hide: PropTypes.func
};

export default NotificationBar;