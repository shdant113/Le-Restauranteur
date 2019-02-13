import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../ResultsModal/index.css';
import Results from '../ResultsModal';
import Header from '../Header';
import '../Header/index.css';
import './index.css';
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
			profile: false,
			saved: [],
			formClass: 'main-form'
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
			show: true,
			formClass: 'display-none'
		})
	}
	hideListModal = () => {
		this.setState({
			show: false,
			formClass: 'main-form'
		})
	}
	goToProfile = () => {
		this.setState({
			profile: true,
			show: false,
			formClass: 'display-none'
		})
	}
	closeProfile = () => {
		this.setState({
			profile: false,
			formClass: 'main-form'
		})
	}
	goToMain = () => {
		this.setState({
			profile: false,
			show: false,
			formClass: 'main-form'
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
	saveRestaurant = async (restaurant, e) => {
		e.preventDefault()
		console.log(restaurant.props.children[0] + ' is in saveRestaurant')
		console.log(restaurant)
		this.setState({
			saved: [...this.state.saved, restaurant.props.children]
		})
		try {
			const response = await fetch('http://localhost:9000/api/v1/restaurantsga/save', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(this.state.saved),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			// console.log(response)
			if (!response.ok) {
				throw Error(response.statusText);
			}
			// const parseResponse = await response.json();
			// console.log('parseResponse is ' + parseResponse)	
		} catch (err) {
			console.log(err)
		}
		// transfer info to back end to store in db under user
			// set up in user model
			// add route?
		// this.resetSave()
	}
	resetSave = () => {
		this.setState({
			saved: []
		})
	}
	componentDidMount() {
		this.getRestaurants();
	}
	render() {
		// console.log(this.state)
		console.log(this.state.saved + ' saved restaurant')
		return (
			<div>
				<div>
					<Header goToProfile={this.goToProfile} goToMain={this.goToMain} handleLogout={this.handleLogout}/>
				</div>
				<div>
					{this.state.profile ? <Profile saved={this.state.saved} closeProfile={this.closeProfile}/> : 
						<form className={this.state.formClass}>
							<h2 className="main-form-text">Let Le Restauranteur make a hard choice easy and enter your city below.</h2>
							<h5 className="main-form-text">Don't know where to go to eat tonight? We search an exhaustive list of the finest restaurants in your city and return a random restaurant for you. Don't like it? No big deal, you can search again! Love it? Great! Save it to your profile and you can remember it the next time you need somewhere to go.</h5>
							<h5 className="main-form-text">If your city name is a common name, you can also include your state for better results!</h5>
							<input type='text' name='search' 
							placeholder='enter your city' 
							value={this.state.city}
							onChange={this.handleChange} />
							<br />
							<button className="main-form-button" onClick={this.submitButton}>Search Your City</button>
						</form>
					}
					{this.state.show ? <Results show={this.state.show} hide={this.hideListModal} restaurants={this.state.restaurants} search={this.submitButton} saveRestaurant={this.saveRestaurant}/> : null }
				</div>
			</div>
		)
	}
}

export default Main;