import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Spinner from '../../components/UI/Spinner/Spinner';
import Card from '../../components/UI/Card/Card';

import classes from './User.module.css';
import axios from 'axios';

class User extends Component {
	state = {
		name: 'Name',
		email: null,
		role: null,
		loading: false

	};
	componentDidMount() {
		const userId = this.props.userId
		const url = process.env.REACT_APP_BASE_URL + '/user/' + userId
		axios.get(url)
			.then((response) => {
				const name = response.data.user.name
				const email = response.data.user.email
				const role = response.data.user.role
				this.setState({
					name: name,
					email: email, 
					role: role
				})
			}).catch(error => {
				console.log('Ops')
				console.log(error)
			})
	}

	render() {
		const userUrl = "https://avatars.githubusercontent.com/u/59183432?s=400&u=46341efa11c8339cbc376408f10d1cd2fce3246d&v=4"
		return (
			<Card>
				<img className={classes.UserImage} src={userUrl} alt={this.state.name} />
				<h1 className={classes.Title}>{this.state.name}</h1>
				<h2>{this.state.email}</h2>
				{(this.state.role !==  null)?<h2>Cargo: {this.state.role}</h2>: null}
				
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
