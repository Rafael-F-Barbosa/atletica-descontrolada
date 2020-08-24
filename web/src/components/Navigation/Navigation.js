import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Navigation.module.css';

const navigation = () => {
	return (
		<nav className={classes.Navigation}>
			<ul>
				<div>
					<NavLink to="/" exact activeClassName={classes.active}>
						DESCONTROLADA
					</NavLink>
				</div>
				<div>
					<NavLink to="/products" activeClassName={classes.active}>
						Produtos
					</NavLink>
					<NavLink to="/parties" exact activeClassName={classes.active}>
						Rolês
					</NavLink>
					<NavLink to="/login" exact activeClassName={classes.active}>
						Login
					</NavLink>
					<NavLink to="/about" activeClassName={classes.active}>
						Cadastrar
					</NavLink>
				</div>
			</ul>
		</nav>
	);
};

export default navigation;
