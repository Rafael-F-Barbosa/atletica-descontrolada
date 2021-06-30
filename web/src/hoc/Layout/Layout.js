import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

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
		console.log("Layout:", this.props.error)
		return (
			<Fragment>
				<Toolbar drawerToggleClicked={this.onSideDrawerToggleHandler} />
				<SideDrawer
					open={this.state.showSideDrawer}
					closed={this.onSideDrawerClosedHandler}
					/>
					{this.props.error&&<h1>Error !</h1>}
					<main className={classes.Layout}>
						{this.props.children}
					</main>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		error: state.error.hasError
	};
};



export default connect(mapStateToProps, null)(Layout) ;
