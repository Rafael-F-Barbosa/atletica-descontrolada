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
					{this.props.hasModal && <Modal
						confirmButton={this.props.confirmButton}
						confirmAction={this.props.onConfirmAction}
						message={this.props.message}
						close={this.props.closeModal}
					/>}
				</main>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		hasModal: state.modal.hasModal,
		message: state.modal.message,
		confirmButton: state.modal.confirmButton
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		closeModal: () => dispatch(actions.closeModal()),
		onConfirmAction: () => dispatch(actions.executeAction())
	};
};




export default connect(mapStateToProps, mapDispatchToProps)(Layout);
