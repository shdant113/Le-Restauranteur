import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './Main';
import Login from './Login';

class App extends Component {
	constructor() {
		super();
		this.state = {
			loggedIn: true
		}
	}
	loginStatus = () => {
		this.setState({
			loggedIn: true
		})
	} 
	render() {
		return (
			<div className="App">
				{this.state.loggedIn ? <Main /> : <Login loginStatus={this.loginStatus} />}
			</div>
		);
	}
}

export default App;
