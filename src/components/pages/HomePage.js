import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions/socketConnectionActions';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

const HomePage = ({ isConnected, disconnect }) => (
    <div>
        <Header as='h1' color='teal'>
            Home Page
        </Header>
        {isConnected ? <button onClick={() => disconnect()}>Disconnect</button> : <div><Link to="/connect">Connect</Link></div>}
    </div>
);

HomePage.propTypes = {
    isConnected: PropTypes.bool.isRequired,
    disconnect: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        isConnected: !!state.main.socketId
    };
}

export default connect(mapStateToProps, { disconnect: actions.disconnectSocket })(HomePage);
