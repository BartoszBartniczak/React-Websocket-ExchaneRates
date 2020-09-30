import React from 'react';
import classes from './CurrentExchangeRates.module.scss';
import Badge from "../../UI/Badge/Badge";
import Indicator from "./Indicator/Indicator";
import CurrencyIcon from "../../UI/CurrencyIcon/CurrencyIcon";

const CurrentExchangeRates = (props) => {


    return (
        <header className={classes.CurrentExchangeRates}>
            <h3>Current exchange rates:</h3>
            <ul>
                {props.currencies.map((currency) => {
                    return <li key={currency}>
                        <Badge><CurrencyIcon currency={currency}/> {currency}</Badge>
                        <div/>
                        <div>
                            <Badge>Buy</Badge>
                            <div>
                                <span>{props.exchangeRates[currency].buy}</span>
                                <Indicator current={props.exchangeRates[currency].buy}
                                           previous={props.previousExchangeRates ? props.previousExchangeRates[currency].buy : null}/>
                            </div>
                        </div>
                        <div>
                            <Badge>Sell</Badge>
                            <div>
                                <span>{props.exchangeRates[currency].sell}</span>
                                <Indicator current={props.exchangeRates[currency].sell}
                                           previous={props.previousExchangeRates ? props.previousExchangeRates[currency].sell : null}/>
                            </div>
                        </div>
                    </li>
                }
                )}
            </ul>
        </header>
    );
};

export default CurrentExchangeRates;
