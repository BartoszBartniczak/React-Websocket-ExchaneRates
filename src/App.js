import React, {useEffect, useState} from 'react';
import classes from './App.module.css';

function App(params) {

    const [currentExchangeRate, setExchangeRate] = useState(parseFloat(0).toFixed(4));
    const [exchangeRates, setExchangeRates] = useState([]);

    useEffect(()=>{
        const webSocket = new WebSocket('ws://localhost:8080');
        webSocket.onmessage = (message)=>{
            const exchangeRateData = JSON.parse(message.data);
            const newExchangeRate = parseFloat(exchangeRateData.exchangeRate).toFixed(4);

            if(currentExchangeRate){
                setExchangeRates((exchangeRates)=>[newExchangeRate,...exchangeRates]);
            }

            setExchangeRate(newExchangeRate);
        };
    }, [])

    return (
        <div className={classes.App}>
            <header>
                <p>
                    Current exchange rate: {currentExchangeRate ? currentExchangeRate : '0.0000'}
                </p>
            </header>
            <section>
                <p>Previous exchange rates:</p>
                <ul>
                    {exchangeRates.map((exchangeRate, index) => <li key={index}>{exchangeRate}</li>)}
                </ul>
            </section>
        </div>
    );
}

export default App;
