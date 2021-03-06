import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
	let inputElement;
	const inputClasses = [ classes.inputElement ];

	if(props.className){
		inputClasses.push(classes[props.className])
	}

	if (props.invalid && props.shouldValidate && props.touched) {
		inputClasses.push(classes.Invalid);
	}

	switch (props.inputType) {
		case 'input':
			inputElement = (
				<input
					onChange={props.changed}
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
				/>
			);
			break;
		case 'select':
			inputElement = (
				<select 
				onChange={props.changed} 
				className={inputClasses.join(' ')} 
				value={props.value}>
					{props.elementConfig.options.map((option) => {
						return (
							<option key={option.value} value={option.value} selected={option.selected}>
								{option.displayValue}
							</option>
						);
					})}
				</select>
			);
			break;
		default:
			inputElement = (
				<input
					onChange={props.changed}
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
				/>
			);
			break;
  }
  
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  )
};

export default input;
