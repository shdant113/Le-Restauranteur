import React, { Component } from 'react';

class Main extends React.Component {
	constructor() {
		super();
		this.state = {
			restaurants: [],
			city: '',
			username: '',
			loggedIn: true
		}
	} 
	handleLogout = () => {
		// set loggedIn to false
		// redirect to login/home screen
	}
	handleChange = (e) => {
		this.setState({
			city: e.currentTarget.value
		})
	}
	submitButton = async (e) => {
		e.preventDefault()
		try {
			console.log(`submitting ${this.state.city}`)
		} catch (err) {
			console.log(err)
			return err
		}
	} 
	render() {
		return (
			<div>
				<h1>this is a list of places</h1>
				<form>
					<input type='text' name='search' 
					placeholder='enter your city' 
					value={this.state.city}
					onChange={this.handleChange} />
					<br />
					<button onClick={this.submitButton}>Search Your City</button>
				</form>
			</div>
		)
	}
}

export default Main;