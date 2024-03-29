import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import FormCard from '../../../components/UI/FormCard/FormCard';

import updateObject from '../../../utility/updateObject';
import checkValidity from '../../../utility/checkValidity';
import * as actions from '../../../store/actions/index';

import classes from './AddProduct.module.css';
import axios from 'axios';

class AddProduct extends Component {
	state = {
		controls: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Nome do produto'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			imageUrl: {
				elementType: 'input',
				elementConfig: {
					type: 'url',
					placeholder: 'image.com/produto.jpeg'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			price: {
				elementType: 'input',
				elementConfig: {
					type: 'number',
					placeholder: 10.15,
					step: 0.01
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			}
		},
		loading: false
	};
	inputChangedHandler = (event, controlName) => {
		const updatedControls = updateObject(this.state.controls, {
			[controlName]: updateObject(this.state.controls[controlName], {
				value: event.target.value,
				valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
				touched: true
			})
		});
		this.setState({ controls: updatedControls });
	};
	submitHandler = (event) => {
		event.preventDefault();
		this.setState({ loading: true })
		const url = process.env.REACT_APP_BASE_URL + '/products/add'
		const name = this.state.controls.name.value
		const price = this.state.controls.price.value
		const imageUrl = this.state.controls.imageUrl.value
		const token = localStorage.getItem('token')

		axios.post(url, {
			name: name,
			price: price,
			imageUrl: imageUrl
		}, {
			headers: {
				Authorization: "Bearer " + token
			}
		}).then((response) => {
			this.setState({ loading: false })
			this.props.openModal({message: "Product created successfully!"})
			console.log(response)
		}).catch((error) => {
			this.props.openModal({message: "Product creation failed."})
			console.log(error)
		})

	};

	render() {
		const formElementsArray = [];
		for (let key in this.state.controls) {
			formElementsArray.push({
				id: key,
				config: this.state.controls[key]
			});
		}
		const form = formElementsArray.map((formElement) => (
			<Input
				key={formElement.id}
				inputType={formElement.config.elementType}
				elementConfig={formElement.config.elementConfig}
				value={formElement.config.value}
				invalid={!formElement.config.valid}
				shouldValidate={formElement.config.validation}
				touched={formElement.config.touched}
				changed={(event) => {
					this.inputChangedHandler(event, formElement.id);
				}}
			/>
		));

		return (
			<FormCard>
				<h1 className={classes.Title}>Novo produto</h1>
				<form onSubmit={this.submitHandler}>
					{form}
					<Button>Criar Produto</Button>
				</form>
			</FormCard>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		openModal: (config) => dispatch(actions.throwModal(config))
	};
};

export default connect(null, mapDispatchToProps)(AddProduct);
