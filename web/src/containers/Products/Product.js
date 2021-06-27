import React from 'react';

import classes from './Product.module.css';
import Card from '../../components/UI/Card/Card'
import Button from '../../components/UI/Button/Button'

import productDescontrolada from '../../assets/images/meia-image.png';

const products = () => {
    return (
        <div className={classes.Products}>
            <Card>
                <h1>Meia</h1>
                <img src={productDescontrolada} alt="Product image" />
                <h2>R$ 15,00</h2>
                <Button>Comprar</Button>
            </Card>
            <Card>
                <h1>Meia</h1>
                <img src={productDescontrolada} alt="Product image" />
                <h2>R$ 15,00</h2>
                <Button>Comprar</Button>
            </Card>
        </div>
    );
};

export default products;
