import React from 'react';
import classes from "./ExchangeRatesHistory.module.scss"
import ExchangeRatesChart from "../ExchangeRatesChart/ExchangeRatesChart";

class ExchangeRatesHistory extends React.Component {

    state = {
        chartData: {}
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.history !== nextProps.history;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const newData = this.convertHistory(this.props.history);

        this.setState({
            chartData: newData,
        })

    }

    convertHistory = (history) => {

        if (!history[0]) {
            return {};
        }

        let currencies = Object.keys(history[0])
            .map(currency => currency);


        let chartData = {};
        currencies.forEach((currency) => {
            chartData[currency] = {
                labels: [],
                buyData: [],
                sellData: [],
            }
        });

        history.forEach((exchangeRate, index) => {
            currencies.forEach((currency) => {
                chartData[currency].labels.push(index);
                chartData[currency].buyData.unshift(parseFloat(exchangeRate[currency].buy));
                chartData[currency].sellData.unshift(parseFloat(exchangeRate[currency].sell));
            })
        });


        return chartData;
    }

    render() {

        const charts =
            Object.keys(this.state.chartData).map((currency) => {
                return <ExchangeRatesChart key={currency} currency={currency}
                                           chartData={this.state.chartData[currency]}/>
            })
        ;

        return (
            <section className={classes.ExchangeRatesHistory}>
                <p>Exchange rates history:</p>
                <div className={classes.Charts}>
                    {charts}
                </div>
            </section>
        );
    }
}

export default ExchangeRatesHistory;
