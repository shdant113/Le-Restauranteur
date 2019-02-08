import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './Main';

class App extends Component {
	render() {
		return (
			<div className="App">
				<h1>This is an app about food</h1>
				<Main />
			</div>
		);
	}
}

export default App;
