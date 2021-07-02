import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Modal from '../../components/UI/Modal/Modal'
import * as actions from '../../store/actions/index';

class Layout extends Component {
	state = {
		showSideDrawer: false
	};

	onSideDrawerClosedHandler = () => {
		this.setState({ showSideDrawer: false });
	};

	onSideDrawerToggleHandler = () => {
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
				<Backdrop
					show={this.props.hasModal}
					clicked={this.props.closeModal}
					/>
					<main className={classes.Layout}>
						{this.props.children}
						{this.props.hasModal&&<Modal message={this.props.message}close={this.props.closeModal}/>}
					</main>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	console.log(state.error.message)
	return {
		hasModal: state.error.hasModal,
		message: state.error.message
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		closeModal: () => dispatch(actions.closeModal())
	};
};




export default connect(mapStateToProps, mapDispatchToProps)(Layout) ;
