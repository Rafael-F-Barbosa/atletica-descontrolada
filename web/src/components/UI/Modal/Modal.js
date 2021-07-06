import React from 'react'
import classes from './Modal.module.css'


const modal = (props) => {
    return (
        <div className={classes.Modal}>
            <h1>{props.message}</h1>
            {props.children}
            <div className={classes.Buttons}>
                <button className={classes.Wrong} onClick={props.close}>Fechar</button>
                {props.confirmButton &&<button onClick={props.confirmAction} className={classes.Right}>Confirmar</button>}
            </div>
        </div>
    )
}

export default modal