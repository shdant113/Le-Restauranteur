import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../ResultsModal/index.css';
import Results from '../ResultsModal';
import Header from '../Header';
import '../Header/index.css';
import Profile from '../Profile';
import Login from '../Login';

class Main extends React.Component {
	constructor() {
		super();
		this.state = {
			restaurants: [],
			city: '',
			show: false,
			username: '',
			loggedIn: true,
			profile: false
		}
	} 
	handleChange = (e) => {
		this.setState({
			city: e.currentTarget.value
		})
	}
	handleLogout = () => {
		this.props.handleLogout()
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
	goToProfile = () => {
		this.setState({
			profile: true
		})
	}
	closeProfile = () => {
		this.setState({
			profile: false
		})
	}
	goToMain = () => {
		this.setState({
			profile: false,
			show: false
		})
	}
	getRestaurants = async () => {
		try {
			const response = await fetch('http://localhost:9000/api/v1/restaurantsga', {
				method: 'GET',
				credentials: 'include'
			});
			console.log(response)
			if (!response.ok) {
				throw Error(response.statusText);
			}
			const parseResponse = await response.json();
			this.setState({
				restaurants: parseResponse.data
			});
			console.log(parseResponse);
		} catch (err) {
			console.log(err)
			return err
		}
	}
	componentDidMount() {
		this.getRestaurants();
	}
	render() {
		console.log(this.state)
		return (
			// header / navigation
			// search bar
			// modal displayed for search
			<div>
				<div>
					<Header goToProfile={this.goToProfile} goToMain={this.goToMain} handleLogout={this.handleLogout}/>
				</div>
				<div>
					{this.state.profile ? <Profile closeProfile={this.closeProfile}/> : 
						<form>
							<input type='text' name='search' 
							placeholder='enter your city' 
							value={this.state.city}
							onChange={this.handleChange} />
							<br />
							<button onClick={this.submitButton}>Search Your City</button>
						</form>
					}
					{this.state.show ? <Results show={this.state.show} hide={this.hideListModal} restaurants={this.state.restaurants} search={this.submitButton}/> : null }
				</div>
			</div>
		)
	}
}

export default Main;