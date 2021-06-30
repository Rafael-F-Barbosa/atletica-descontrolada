import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import FormCard from '../../components/UI/FormCard/FormCard';

import updateObject from '../../utility/updateObject';
import checkValidity from '../../utility/checkValidity';
import * as actions from '../../store/actions/index';

import classes from './Signup.module.css';

class Signup extends Component {
	state = {
		controls: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'nome'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'email'
				},
				value: '',
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				touched: false
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'senha top'
				},
				value: '',
				validation: {
					required: true,
					minLength: 6
				},
				valid: false,
				touched: false
			},
			confirmPassword: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'repita a senha'
				},
				value: '',
				validation: {
					required: true,
					minLength: 6,
					isEqual: true
				},
				valid: false,
				touched: false
			}
		}
	};
	inputChangedHandler = (event, controlName) => {
		const updatedControls = updateObject(this.state.controls, {
			[controlName]: updateObject(this.state.controls[controlName], {
				value: event.target.value,
				valid: checkValidity(
					event.target.value,
					this.state.controls[controlName].validation,
					this.state.controls.password.value
				),
				touched: true
			})
		});
		this.setState({ controls: updatedControls });
	};
	submitHandler = (event) => {
		event.preventDefault();
		const signUpData = {
			name: this.state.controls.name.value,
			email: this.state.controls.email.value,
			password: this.state.controls.password.value
		};
		this.props.onSignUp(signUpData);
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

		let formOrSpinner = form;
		if (this.props.loading) {
			formOrSpinner = <Spinner />;
		}

		return (
			<FormCard className={classes.Auth}>
				<h1 className={classes.Title}>Cadastro</h1>
				<form onSubmit={this.submitHandler}>
					{formOrSpinner}
					<Button>Cadastrar</Button>
				</form>
			</FormCard>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.login.loading
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		onSignUp: (signUpData) => dispatch(actions.signUp(signUpData))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
