import React from 'react';
import PropTypes from 'prop-types';
import ConnectForm from '../forms/ConnectForm';
import SocketIO from '../../socketHandler';

let SocketInstance = SocketIO.instance;

class ConnectPage extends React.Component {
    constructor(props) {
        super(props);
        this._submit = this.submit.bind(this);
    }

    submit = data =>
        new Promise((resolve, reject) => {
            SocketInstance.clientConnect(data.username, (err) => {
                if (err) {
                    reject(err);
                } else {
                    this.props.history.push('/dashboard');
                    resolve();
                }
            });
        });

    render() {
        return (
            <div>
                <ConnectForm submit={this._submit} />
            </div>
        );
    }
}

ConnectPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
};

export default ConnectPage;
