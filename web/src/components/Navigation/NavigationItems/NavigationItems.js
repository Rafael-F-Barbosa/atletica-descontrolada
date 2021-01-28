import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem'

const navigation = (props) => {
	return (
		<nav className={classes.Navigation}>
			<ul>
					<NavigationItem link={"/products"} exact>Produtos</NavigationItem>
					<NavigationItem link={"/parties"} exact>Rolês</NavigationItem>
					<NavigationItem link={"/login"} exact>Login</NavigationItem>
					<NavigationItem link={"/sign-up"} exact>Cadastrar</NavigationItem>
			</ul>
		</nav>
	);
};

export default navigation;
