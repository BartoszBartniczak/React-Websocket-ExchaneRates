import React from 'react';
import 'flag-icon-css/css/flag-icon.min.css';
import classes from './CurrencyIcon.module.scss';

const CurrencyIcon = (props) => {

    const mapping = {
        PLN: 'pl',
        EUR: 'eu',
        USD: 'us',
        CHF: 'ch'
    };

    let classNames = [
        "flag-icon",
        classes.CurrencyIcon
    ];

    let hasFlag = false;

    if(props.currency && mapping[props.currency]){
        classNames.push('flag-icon-'+mapping[props.currency]);
        hasFlag = true;
    }

    return hasFlag ? <span className={classNames.join(' ')}/>: null;
};

export default CurrencyIcon;
