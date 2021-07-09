import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spinner from '../../components/UI/Spinner/Spinner'

import classes from './UserProfile.module.css';
import axios from 'axios';

const avatarsIcons = [
	"https://image.flaticon.com/icons/png/512/2939/2939326.png",
	"https://image.flaticon.com/icons/png/512/774/774834.png",
	"https://image.flaticon.com/icons/png/512/1998/1998728.png",
	"https://image.flaticon.com/icons/png/512/1717/1717824.png"
]
class UserProfile extends Component {
	state = {
		name: 'Name',
		email: null,
		role: null,
		imageUrl: null,
		loading: false,
		products: [],
		avatarsIconsIndex: 0
	};
	onHandleArrowLeft = () => {
		const index = (this.state.avatarsIconsIndex + 1) % avatarsIcons.length
		const imageUrl = avatarsIcons[index]
		const url = process.env.REACT_APP_BASE_URL + '/user/update/avatar'
		axios.put(url, {
			imageUrl: imageUrl
		}).then(result => {
			this.setState({ imageUrl: imageUrl, avatarsIconsIndex: index })
		}).catch(error => {
			console.log(error)
		})
	}
	onHandleArrowRight = () => {
		let index = (this.state.avatarsIconsIndex - 1) % avatarsIcons.length
		if (index < 0) {
			index = avatarsIcons.length - 1
		}
		const imageUrl = avatarsIcons[index]
		const url = process.env.REACT_APP_BASE_URL + '/user/update/avatar'
		axios.put(url, {
			imageUrl: imageUrl
		}).then(result => {
			this.setState({ imageUrl: imageUrl, avatarsIconsIndex: index })
		}).catch(error => {
			console.log(error)
		})
	}
	componentDidMount() {
		this.setState({ loading: true })
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
				this.setState({ loading: false })
			})
	}

	render() {
		let componentToRender = <Spinner />
		if (!this.state.loading) {
			componentToRender = (
				<div className={classes.UserContainer}>
					<div className={classes.ImageContainer}>
						<div onClick={this.onHandleArrowLeft} className={classes.ArrowLeft}> {"<"} </div>
						<img className={classes.UserImage} src={this.state.imageUrl} alt={this.state.name} />
						<div onClick={this.onHandleArrowRight} className={classes.ArrowRight} > {">"}  </div>
					</div>
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
