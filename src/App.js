import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ConnectPage from './components/pages/ConnectPage';
import DashboardPage from './components/pages/DashboardPage';
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';
import { clientDisconnectSocket } from './actions/socketConnectionActions';
import { changePeriod } from './actions/dashboardActions';
import { periodTypes } from './settings';
import {
    Container,
    Dropdown,
    Menu,
    Icon,
    Button
} from 'semantic-ui-react'

class App extends React.Component {
    renderDropDownItems() {
        return Object.keys(periodTypes).map(type =>
            <Dropdown.Item key={type} text={periodTypes[type]} value={type} onClick={(e, data) => this.props.changePeriod(data.value, this.props.socketId)} />
        );
    }

    render() {
        let { location, isConnected, username, currentPeriod, clientDisconnectSocket } = this.props;

        return <div className="ui container">
            <Menu fixed='top' inverted>
                <Container>
                    <Menu.Item header>
                        <Icon circular inverted color='teal' name='users' style={{ marginRight: '1em' }}/>
                        Real-Time Stocks Monitor
                    </Menu.Item>
                    {isConnected ?
                        <Menu.Item>
                            Period
                        <Dropdown inline item style={{marginLeft: '1em', borderColor: 'black', border: 'none'}}
                                  text={periodTypes[currentPeriod]}>
                            <Dropdown.Menu>
                                {this.renderDropDownItems()}
                            </Dropdown.Menu>
                        </Dropdown>
                        </Menu.Item> : ''}
                    {isConnected ?
                        <Menu.Menu position='right'>
                            <Menu.Item>
                                <Icon name='user' color='green' size='large'/>
                                Hello {username}
                            </Menu.Item>
                            <Menu.Item>
                                <Button secondary onClick={() => clientDisconnectSocket()}>
                                    Disconnect
                                </Button>
                            </Menu.Item>
                        </Menu.Menu> : ''
                    }
                </Container>
            </Menu>
            <Container style={{ marginTop: '7em' }}>
                <GuestRoute location={location} path="/" exact component={ConnectPage}/>
                <UserRoute location={location} path="/dashboard" exact component={DashboardPage}/>
            </Container>
        </div>
    }
}

App.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired,
    isConnected: PropTypes.bool.isRequired,
    socketId: PropTypes.string.isRequired,
    currentPeriod: PropTypes.number.isRequired,
    clientDisconnectSocket: PropTypes.func.isRequired,
    changePeriod: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        isConnected: !!state.main.socketId,
        username: state.main.username,
        currentPeriod: state.main.currentPeriod,
        socketId: state.main.socketId
    };
}

export default connect(mapStateToProps, { clientDisconnectSocket, changePeriod })(App);
