import React, { Component, Fragment } from 'react';

import Navigation from '../../components/Navigation/Navigation';
import classes from './Layout.module.css';

class Layout extends Component {
	render() {
		return (
			<Fragment>
				<main className={classes.Layout}>
					<Navigation />
					{this.props.children}
				</main>
			</Fragment>
		);
	}
}

export default Layout;
