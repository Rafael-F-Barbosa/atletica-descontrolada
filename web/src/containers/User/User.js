import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Card from '../../components/UI/Card/Card';

import updateObject from '../../utility/updateObject';
import checkValidity from '../../utility/checkValidity';
import * as actions from '../../store/actions/index';


import classes from './User.module.css';
import axios from 'axios';

class User extends Component {
	state = {
		name: 'Name',
		email: null,
		loading: false

	};
	componentDidMount() {
		const userId = this.props.userId
		const url = process.env.REACT_APP_BASE_URL + '/user/' + userId
		axios.get(url)
			.then((response) => {
				const name = response.data.user.name
				const email = response.data.user.email
				this.setState({
					name: name,
					email: email
				})
			}).catch(error => {
				console.log('Ops')
				console.log(error)
			})
	}

	render() {
		let formOrSpinner = undefined
		if (this.state.loading) {
			formOrSpinner = <Spinner />
		}


		return (
			<Card>
				<h1 className={classes.Title}>{this.state.name}</h1>
				<h2>{this.state.email}</h2>
			</Card>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.login.loading,
		userId: state.login.userId
	};
};
// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		onLogin: (email, password) => dispatch(actions.login(email, password))
// 	};
// };

export default connect(mapStateToProps, null)(User);
