import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigation = (props) => {
	return (
		<nav className={classes.Navigation}>
			<ul>
				<NavigationItem link={'/'} exact>
					Início
				</NavigationItem>
				<NavigationItem link={'/products'} exact>
					Produtos
				</NavigationItem>
				<NavigationItem link={'/users'} exact>
					Membros
				</NavigationItem>
				{props.logggedIn ? (
					<Fragment>
						<NavigationItem link={'/user'} exact>
							Minha conta
						</NavigationItem>
						<NavigationItem link={'/logout'} exact>
							Logout
						</NavigationItem>
					</Fragment>
				) : (
					<Fragment>
						<NavigationItem link={'/login'} exact>
							Entrar
						</NavigationItem>
						<NavigationItem link={'/sign-up'} exact>
							Cadastrar
						</NavigationItem>
					</Fragment>
				)}
			</ul>
		</nav>
	);
};

const mapStateToProps = (state) => {
	return {
		logggedIn: state.login.token
	};
};
export default connect(mapStateToProps)(navigation);
