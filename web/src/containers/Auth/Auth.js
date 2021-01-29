import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button'
import updateObject from '../../utility/updateObject'
import checkValidity from '../../utility/checkValidity'

import classes from './Auth.module.css';

class Auth extends Component{
state = {
  controls: {
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'mariazinha@gmail.com'
      },
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false,
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
			}
  }
}
inputChangedHandler = (event, controlName) =>{ 
  const updatedControls = updateObject(this.state.controls, {
			[controlName]: updateObject(this.state.controls[controlName], {
				value: event.target.value,
				valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
				touched: true
			})
    });
		this.setState({ controls: updatedControls });
}

  render(){
    const formElementsArray = [];
		for (let key in this.state.controls) {
			formElementsArray.push({
				id: key,
				config: this.state.controls[key]
			});
    }
    const form = formElementsArray.map((formElement)=>
          <Input 
            key={formElement.id}
            inputType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) =>          
              {this.inputChangedHandler(event, formElement.id)}}
          />
          ) 
    return (
      <div className={classes.Auth}>
        <h1 className={classes.Title}>Login</h1>
        {form}
        <Button>Entrar</Button>
        <NavLink className={classes.changeAuth} to="/sign-up">Alternar para cadastro.</NavLink>
      </div>
    )
  }
}

export default (Auth)