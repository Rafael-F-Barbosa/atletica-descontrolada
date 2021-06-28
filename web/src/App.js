import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home';
import Login from './containers/Auth/Login';
import Signup from './containers/Auth/Signup';
import Logout from './containers/Auth/Logout';
import User from './containers/User/User';
import Products from './containers/Products/Product';
import * as actions from './store/actions/index';

class App extends Component {

	componentDidMount() {
		this.props.onTryAutoSignup();
	}

	render() {
		let routes = (
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/products" exact component={Products} />
				<Route path="/login" exact component={Login} />
				<Route path="/sign-up" exact component={Signup} />
			</Switch>
		)
		if (this.props.isAuth) {
			routes = (
			<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/products" exact component={Products} />
					<Route path="/user" exact component={User} />
					<Route path="/logout" exact component={Logout} />
					<Redirect to="/"/>
				</Switch>
			)
		}
		return (
			<Layout>
				{routes}
			</Layout >
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuth: state.login.token !== null
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onTryAutoSignup: () => dispatch(actions.checkLogin())
	};
};



export default connect(mapStateToProps, mapDispatchToProps)(App);
