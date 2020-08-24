import React from 'react';

import classes from './Logo.module.css';
import descontroladaLogo from '../../../assets/images/logo.png';

const logo = () => {
	return (
		<div className={classes.Logo}>
			<img src={descontroladaLogo} alt="Descontrolada Logo" />
		</div>
	);
};

export default logo;
