import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './Main';
import Login from './Login';

class App extends Component {
	constructor() {
		super();
		this.state = {
			loggedIn: false
		}
	}
	handleLogin = () => {
		this.setState({
			loggedIn: true
		})
	}
	handleLogout = () => {
		this.setState({
			loggedIn: false
		})
	}
	render() {
		return (
			<div className="App">
				{this.state.loggedIn ? <Main handleLogout={this.handleLogout}/> : <Login loginStatus={this.loginStatus} />}
			</div>
		);
	}
}

export default App;
