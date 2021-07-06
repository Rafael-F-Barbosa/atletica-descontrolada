import React from 'react'
import classes from './Product.module.css'
import Button from '../../../components/UI/Button/Button'


const product = (props) => {
    return (
        <li key={props.product._id} className={classes.Product}>
            {props.isAdmin && <div onClick={props.onClickDeleteButton}>X</div>}
            <h1>{props.product.name}</h1>
            <img src={props.product.imageUrl} alt={props.product.name} />
            <h2>R$ {props.product.price.toFixed(2)}</h2>
            <Button>Comprar</Button>
        </li>
    )

}

export default product