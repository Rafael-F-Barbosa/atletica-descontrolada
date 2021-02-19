import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home';
import About from './containers/About/About';
import Auth from './containers/Auth/Auth';
import Signup from './containers/Auth/Signup'

class App extends Component {
	render() {
		return (
			<Layout>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/about" exact component={About} />
					<Route path="/login" exact component={Auth} />
					<Route path="/sign-up" exact component={Signup} />
					<Route path="/logout" exact component={Auth} />
				</Switch>
			</Layout>
		);
	}
}

export default App;
