import React, { Component } from 'react';
import classes from './Descontrolada.module.css';

class App extends Component {
	render() {
		return (
			<main className={classes.Descontrolada}>
				<nav className={classes.Navigation}>
					<ul>
						<a href="/home">
							<li>Home</li>
						</a>
						<a href="/home">
							<li>Add a post</li>
						</a>
					</ul>
				</nav>
			</main>
		);
	}
}

export default App;
