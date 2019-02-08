import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RandomRestaurantModal from '../ResultsModal'

class Main extends React.Component {
	constructor() {
		super();
		this.state = {
			restaurants: [],
			city: '',
			show: false,
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
			// PROMISES
			// fetch information from API
				// method GET credentials include body stringify append headers
			// check error
			// json parse response
			// set new state with restaurants array
				// run function to display one random index out of restaurants array
					// remove index of restaurant displayed from available indexes to display so that it does not get displayed again if they choose another random search
				// display in modal? setstate
					// reference wireframes --> map display with pin
						// refer to lab?
					// button to rerender modal with a new restaurant
			this.showListModal();
		} catch (err) {
			console.log(err)
			return err
		}
	}
	showListModal = () => {
		this.setState({
			show: true
		})
	}
	hideListModal = () => {
		this.setState({
			show: false
		})
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
				{this.state.show ? <RandomRestaurantModal show={this.state.show} hide={this.hideListModal} /> : null }
			</div>
		)
	}
}

export default Main;