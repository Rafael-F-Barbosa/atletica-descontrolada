import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, NavLink } from 'react-router-dom';

import classes from './Product.module.css';
import Card from '../../components/UI/Card/Card'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'


class Products extends Component {
    state = {
        products: [],
        loading: false,
        addProduct: false
    };
    componentDidMount() {
        this.setState({ loading: true })
        const url = process.env.REACT_APP_BASE_URL + '/products'
        axios.get(url)
            .then((response) => {
                const products = [...response.data.products]
                this.setState({
                    products: [...products]
                })
                this.setState({ loading: false })
            }).catch(error => {
                this.setState({ loading: false })
                console.log(error)
            })
    }
    onAddProductHandler() {
        this.setState({ addProduct: true })
    }
    render() {
        if (this.state.addProduct) {
            return (<Redirect to="add-product" />)
        }
        let productsOrSpinner = <Spinner />
        if (!this.state.loading) {
            productsOrSpinner = (
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
            )
        }
        return (
            <div className={classes.ProductsPage}>
                {productsOrSpinner}
                <NavLink to="add-product">Add product</NavLink>
            </div>
        );
    }
};

export default Products;
