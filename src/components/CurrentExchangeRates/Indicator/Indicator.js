import React from 'react';
import classes from './Indicator.module.scss';

const Indicator = (props) => {
    let status = "∘";
    let indicatorClasses = [classes.Indicator];

    if(props.previous){

        if(props.current > props.previous){
            status = '↑';
            indicatorClasses.push(classes.up)
        }
        else if(props.current < props.previous){
            status = '↓';
            indicatorClasses.push(classes.down);
        }

    }

    return (
        <span className={indicatorClasses.join(' ')}>{status}</span>
    );
};

export default Indicator;
