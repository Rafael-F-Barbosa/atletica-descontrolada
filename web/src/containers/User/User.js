import React, { Component } from 'react';
import { connect } from 'react-redux';

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
				const imageUrl = response.data.user.imageUrl
				this.setState({
					name: name,
					email: email, 
					role: role,
					imageUrl: imageUrl
				})
			}).catch(error => {
				console.log('Ops')
				console.log(error)
			})
	}

	render() {
		return (
			<Card>
				<img className={classes.UserImage} src={this.state.imageUrl} alt={this.state.name} />
				<h1 className={classes.Title}>{this.state.name}</h1>
				<h2>{this.state.email}</h2>
				<h2>Cargo: {this.state.role}</h2>
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

export default connect(mapStateToProps, null)(User);
