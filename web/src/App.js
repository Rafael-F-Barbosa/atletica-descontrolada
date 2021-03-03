import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home';
import About from './containers/About/About';
import Login from './containers/Auth/Login';
import Signup from './containers/Auth/Signup';
import Logout from './containers/Auth/Logout'

class App extends Component {
	render() {
		return (
			<Layout>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/about" exact component={About} />
					<Route path="/login" exact component={Login} />
					<Route path="/sign-up" exact component={Signup} />
					<Route path="/logout" exact component={Logout} />
				</Switch>
			</Layout>
		);
	}
}

export default App;
