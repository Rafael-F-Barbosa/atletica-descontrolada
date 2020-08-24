import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Descontrolada from './containers/Home/Home';
import About from './containers/About/About';
class App extends Component {
	render() {
		return (
			<Layout>
				<Switch>
					<Route path="/" exact component={Descontrolada} />
					<Route path="/about" exact component={About} />
				</Switch>
			</Layout>
		);
	}
}

export default App;
