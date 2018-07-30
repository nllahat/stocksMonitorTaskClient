import React from 'react';
import {
    XAxis,
    YAxis,
    LineSeries,
    FlexibleWidthXYPlot
} from 'react-vis';
import Candlestick from './Candlestick';
import './candlestick.scss';

const TEN_MIN = 600000;

export default class StockChart extends React.Component {
    render() {
        const data = this.props.stockValues || [];
        const startTimestamp = this.props.startTimestamp || (data[0] ? data[0].x : new Date().getTime());
        const endTimestamp = this.props.endTimestamp || startTimestamp + TEN_MIN / 2;

        return (
            data && (
                <div className="candlestick-example">
                    <div className="chart">
                        <FlexibleWidthXYPlot
                            animation
                            xDomain={[startTimestamp - 10000, endTimestamp]}
                            yDomain={[0, 25]}
                            xType="time"
                            height={250}>
                            <XAxis title="Timeline"/>
                            <YAxis title="Stock Value"/>
                            <LineSeries
                                color="#b2b2b2"
                                data={data}/>
                            <LineSeries
                                color="#1A3177"
                                className="dashed-example-line"
                                opacity={0}
                                data={[{ x: startTimestamp, y: 20 }, { x: endTimestamp, y: 20 }]}/>
                            <Candlestick
                                colorType="literal"
                                opacityType="literal"
                                stroke="#b2b2b2"
                                data={data}/>
                        </FlexibleWidthXYPlot>
                    </div>
            </div>)
        );
    }
}
