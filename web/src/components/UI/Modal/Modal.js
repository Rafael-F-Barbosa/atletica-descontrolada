import React from 'react'
import classes from './Modal.module.css'


const modal = (props) => {

    return (
        <div className={classes.Modal}>
            <h1>{props.message}</h1>
            <button onClick={props.close}>Fechar</button>
        </div>
    )
}

export default modal