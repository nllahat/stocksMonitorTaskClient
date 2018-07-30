import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getHistory } from '../../actions/dashboardActions';
import 'react-vis/dist/style.css';
import StockChart from '../charts/StockChart';
import HistoryChart from '../charts/HistoryChart';
import {
    Header,
    Container,
    Divider
} from 'semantic-ui-react'

class DashboardPage extends React.Component {
    render() {
        return (
            <div className="ui container">
                <Container>
                    <Header>Live 5 Minutes Range</Header>
                    <Divider/>
                    <StockChart stockValues={this.props.stockValues}/>
                </Container>
                <HistoryChart socketId={this.props.socketId} currentPeriod={this.props.currentPeriod} getHistory={this.props.getHistory} />
            </div>
        );
    }
}

DashboardPage.propTypes = {
    socketId: PropTypes.string.isRequired,
    stockValues: PropTypes.array.isRequired,
    currentPeriod: PropTypes.number.isRequired,
    getHistory: PropTypes.func.isRequired,
};


const mapStateToProps = state => {
    return {
        socketId: state.main.socketId,
        stockValues: state.main.stockValues || [],
        currentPeriod: state.main.currentPeriod,
        currentHistory: state.main.currentHistory,
        historyResult: state.main.historyResult
    };
};

export default connect(mapStateToProps, { getHistory })(DashboardPage);
