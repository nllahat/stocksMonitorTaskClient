import React, { Component } from 'react';
import { List } from 'semantic-ui-react'

class StockValueList extends Component {
    renderStockValues(stockValues) {
        return stockValues.map(stockValue =>
            <List.Item key={stockValue.date}>
                Open: {stockValue.open}
                Close: {stockValue.close}
                High: {stockValue.high}
                Low: {stockValue.low}
            </List.Item>
        );
    }

    render() {
        return (
            <List>
                {this.renderStockValues(this.props.stockValues)}
            </List>
        );
    }
}

export default StockValueList;
