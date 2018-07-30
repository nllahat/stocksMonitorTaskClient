import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const GuestRoute = ({isConnected, component: Component, ...rest }) => (
    <Route {...rest} render={props => !isConnected ?
        <Component {...props} /> :
        <Redirect to="/dashboard" />}
    />
);

GuestRoute.propTypes = {
    component: PropTypes.func.isRequired,
    isConnected: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        isConnected: !!state.main.socketId
    }
}

export default connect(mapStateToProps)(GuestRoute);
