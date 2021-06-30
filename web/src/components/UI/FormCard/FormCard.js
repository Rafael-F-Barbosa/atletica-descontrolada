import classes from './FormCard.module.css';
import React from 'react'

const formCard = (props) =>{
    return(
        <div className={classes.FormCard}>
            {props.children}
        </div>
    )
}


export default formCard