import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

import classes from './Products.module.css';
import Modal from '../../components/UI/Modal/Modal'
import Backdrop from '../../components/UI/Backdrop/Backdrop'
import Spinner from '../../components/UI/Spinner/Spinner'
import isUserAdmin from '../../utility/isUserAdmin'
import Product from './Product/Product'



class Products extends Component {
    state = {
        products: [],
        loading: false,
        addProduct: false,
        isAdmin: false,
        deleteProduct: false,
        selectedProductId: ''
    };

    componentDidMount() {
        this.setState({ loading: true })
        const userId = localStorage.getItem('userId')
        isUserAdmin(userId).then((isUserAdmin) => {
            this.setState({ isAdmin: isUserAdmin })
        })
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
    onDeleteProduct = (productId) => {
        this.setState({
            deleteProduct: true,
            selectedProductId: productId
        })
    }
    closeModal = () => {
        this.setState({
            deleteProduct: false,
            selectedProductId: ''
        })
    }
    confirmDelete = () => {
        this.setState({ loading: true })
        const url = process.env.REACT_APP_BASE_URL + '/products/delete/' + this.state.selectedProductId
        axios.delete(url)
            .then((result) => {
                this.setState({products: result.data.products})
                this.setState({ loading: false })
                this.closeModal()
            }).catch((error) => {
                console.log(error)
                this.setState({ loading: false })
                this.closeModal()
            })
    }
    render() {
        let productsOrSpinner = <Spinner />
        if (!this.state.loading) {
            productsOrSpinner = (
                <ul className={classes.Products}>
                    {
                        this.state.products.map(product => {
                            return (
                                <Product
                                    key={product._id}
                                    onClickDeleteButton={this.onDeleteProduct.bind(this, product._id)}
                                    product={{...product}}
                                    isAdmin={this.state.isAdmin}
                                />
                            )

                        })
                    }
                </ul>
            )
        }
        return (
            <div className={classes.ProductsPage}>
                {productsOrSpinner}
                {this.state.isAdmin && <NavLink to="add-product">Add product</NavLink>}
                {this.state.deleteProduct && 
                <Modal
                    confirmButton
                    confirmAction={this.confirmDelete.bind(this)}
                    message={"Certeza que deseja deletar esse produto? "}
                    close={this.closeModal.bind(this)}

                />}
                <Backdrop show={this.state.deleteProduct} clicked={this.closeModal} />
            </div>
        );
    }
};

export default Products;
