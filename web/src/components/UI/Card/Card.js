import classes from './Card.module.css';
import React from 'react'

const card = (props) =>{
    return(
        <div key={props.card_id} className={classes.Card}>
            {props.children}
        </div>
    )
}


export default card