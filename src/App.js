import React, {useEffect, useState} from 'react';
import classes from './App.module.scss';
import CurrentExchangeRates from "./components/CurrentExchangeRates/CurrentExchangeRates";
import ExchangeRatesHistory from "./containers/ExchangeRatesHistory/ExchangeRatesHistory";

function App(params) {

    const [currentExchangeRates, setCurrentExchangeRates] = useState([]);
    const [exchangeRatesHistory, setExchangeRatesHistory] = useState([]);
    const [currencies, setCurrencies] = useState([]);

    useEffect(() => {
        const webSocket = new WebSocket('ws://localhost:8080');
        webSocket.onmessage = (message) => {
            const exchangeRatesData = JSON.parse(message.data);
            parseData(exchangeRatesData);
        };
    }, [])

    const parseData = (data) => {
        const newExchangeRates = data.exchangeRates;

        if (newExchangeRates) {
            setExchangeRatesHistory((exchangeRates) => [newExchangeRates, ...exchangeRates].slice(0, 100));
        }

        setCurrentExchangeRates(newExchangeRates);
        setCurrencies(Object.keys(newExchangeRates));
    }

    return (
        <div className={classes.App}>
            <CurrentExchangeRates currencies={currencies} exchangeRates={currentExchangeRates} previousExchangeRates={exchangeRatesHistory[1]}/>
            <ExchangeRatesHistory history={exchangeRatesHistory} />
        </div>
    );
}

export default App;
