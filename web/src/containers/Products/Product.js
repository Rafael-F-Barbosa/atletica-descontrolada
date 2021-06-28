import React, { Component } from 'react';
import axios from 'axios';

import classes from './Product.module.css';
import Card from '../../components/UI/Card/Card'
import Button from '../../components/UI/Button/Button'

import { Redirect, NavLink } from 'react-router-dom';

class Products extends Component {
    state = {
        products: [],
        loading: false,
        addProduct: false
    };
    componentDidMount() {
        const url = process.env.REACT_APP_BASE_URL + '/products'
        axios.get(url)
            .then((response) => {
                const products = [...response.data.products]
                this.setState({
                    products: [...products]
                })
            }).catch(error => {
                console.log('Opsius')
                console.log(error)
            })
    }
    onAddProductHandler(){
        this.setState({addProduct: true})
    }
    render() {
        if(this.state.addProduct){
            return (<Redirect to="add-product"/>)
        }
        return (
            <div className={classes.ProductsPage}>
                <div className={classes.Products}>
                    {
                        this.state.products.map(product => {
                            return (<Card>
                                <h1>{product.name}</h1>
                                <img src={product.imageUrl} alt={product.name} />
                                <h2>R$ {product.price.toFixed(2)}</h2>
                                <Button>Comprar</Button>
                            </Card>)
                        })
                    }
                </div>
                    <NavLink to="add-product">Add product</NavLink>
            </div>
        );
    }

};

export default Products;
