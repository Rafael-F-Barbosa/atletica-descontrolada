import React, { Component, Fragment } from 'react';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';


class Layout extends Component {
	state = {
		showSideDrawer: false
	};

	onSideDrawerClosedHandler = () => {
		this.setState({ showSideDrawer: false });
	};

	onSideDrawerToggleHandler = () => {
		console.log(this.state);
		this.setState((prevState) => {
			return { showSideDrawer: !prevState.showSideDrawer };
		});
	};

	render() {
		return (
			<Fragment>
				<Toolbar drawerToggleClicked={this.onSideDrawerToggleHandler} />
				<SideDrawer 
					open={this.state.showSideDrawer} 
					closed={this.onSideDrawerClosedHandler}
				/>
				<main className={classes.Layout}>
					{this.props.children}
				</main>
			</Fragment>
		);
	}
}

export default Layout;
