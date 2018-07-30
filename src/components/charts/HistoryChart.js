import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getHistory } from '../../actions/dashboardActions';
import 'react-vis/dist/style.css';
import StockChart from '../charts/StockChart';
import { historyMapMilliseconds } from '../../settings';
import {
    Header,
    Container,
    Menu
} from 'semantic-ui-react'

class HistoryChart extends React.Component {
    state = {
        currentHistory: this.props.currentHistory,
    };

    handleItemClick = (e, { value }) => {
        this.props.getHistory(this.props.socketId, value, this.props.currentPeriod)
            .then(() => {
                this.setState({ currentHistory: value });
            });
    };

    render() {
        const { currentHistory } = this.state;

        return (
            <div className="ui container">
                <Container style={{ marginTop: '1em' }}>
                    <Header>History</Header>
                    <Menu tabular>
                        <Menu.Item name='Last 10 min' value={1} active={currentHistory === 1} onClick={this.handleItemClick}/>
                        <Menu.Item name='Last 30 min' value={2} active={currentHistory === 2} onClick={this.handleItemClick}/>
                        {/*<Menu.Item name='Last 1 hour' value={3} active={currentHistory === 3} onClick={this.handleItemClick}/>*/}
                    </Menu>
                    <StockChart stockValues={this.props.historyResult}
                                startTimestamp={new Date().getTime() - historyMapMilliseconds[currentHistory] - 100000}
                                endTimestamp={new Date().getTime() + 100000}
                    />
                </Container>
            </div>
        );
    }
}

HistoryChart.propTypes = {
    socketId: PropTypes.string.isRequired,
    currentPeriod: PropTypes.number.isRequired,
    getHistory: PropTypes.func.isRequired,
};


const mapStateToProps = state => {
    return {
        currentHistory: state.main.currentHistory,
        historyResult: state.main.historyResult
    };
};

export default connect(mapStateToProps, { getHistory })(HistoryChart);
