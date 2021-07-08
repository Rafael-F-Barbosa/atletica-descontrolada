import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spinner from '../../components/UI/Spinner/Spinner'

import classes from './UserProfile.module.css';
import axios from 'axios';

class UserProfile extends Component {
	state = {
		name: 'Name',
		email: null,
		role: null,
		imageUrl: null,
		loading: false,
		products: []
	};
	componentDidMount() {
		this.setState({loading: true})
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
					imageUrl: imageUrl,
					loading: false
				})
			}).catch(error => {
				console.log(error)
				this.setState({loading: false})
			})
	}

	render() {
		let componentToRender = <Spinner />
		if (!this.state.loading) {
			componentToRender = (
				<div className={classes.UserContainer}>
					<img className={classes.UserImage} src={this.state.imageUrl} alt={this.state.name} />
					<h1>{this.state.name}</h1>
					<h2>{this.state.email}</h2>
					<h2>Cargo: {this.state.role}</h2>
					<h1>Produtos Comprados</h1>
					{this.state.products.length === 0 ? <p>Você ainda não comprou nada</p> : null}
				</div>
			)
		}
		return componentToRender;
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.login.loading,
		userId: state.login.userId
	};
};

export default connect(mapStateToProps, null)(UserProfile);
