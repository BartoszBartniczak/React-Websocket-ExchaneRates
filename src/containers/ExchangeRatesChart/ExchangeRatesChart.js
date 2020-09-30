import React from 'react';
import LinearChart from "../../UI/Chart/LinearChart/LinearChart";

class ExchangeRatesChart extends React.Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.chartData !== nextProps.chartData;
    }

    render() {
        return (
            <LinearChart
                title={this.props.currency + " exchange rate history"}
                labels={this.props.chartData.labels}
                datasets={[
                    {
                        data: this.props.chartData.buyData,
                        label: 'Buy exchange rate',
                        borderColor: '#89d4d4',
                        fill: false,
                        pointRadius: 2,
                        lineTension: 0,
                    },
                    {
                        data: this.props.chartData.sellData,
                        label: 'Sell exchange rate',
                        borderColor: '#af6bb6',
                        fill: false,
                        pointRadius: 2,
                        lineTension: 0,
                    }
                ]}/>
        );
    }
}

export default ExchangeRatesChart;
