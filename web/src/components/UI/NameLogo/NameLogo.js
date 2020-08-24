import React from 'react';

import classes from './NameLogo.module.css';
import descontroladaName from '../../../assets/images/name-logo.png';

const name = (props) => {
	return (
		<div className={classes.Name} style={{ height: props.height }}>
			<img src={descontroladaName} alt="Descontrolada" />
		</div>
	);
};

export default name;
