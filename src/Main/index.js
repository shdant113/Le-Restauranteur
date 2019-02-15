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
	// when the user types in the search field
	handleChange = (e) => {
		this.setState({
			city: e.currentTarget.value
		})
	}
	// logs the user out of the site
	handleLogout = () => {
		this.props.handleLogout()
	}
	// when the user presses the submit button in the search field
	handleSubmit = async (city, e) => {
		e.preventDefault()
		try {
			// posting to the API with the search field content
			const sendCity = await fetch(process.env.REACT_APP_CLIENT_APP_URI + '/api/v1/restaurantsga/city', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify({
					city: city				
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			if (!sendCity.ok) {
				throw Error(sendCity.statusText);
			}
			// response from API
			const getRestaurants = await sendCity.json()
			// set new data in state (to be randomized and shown in the results modal)
			await this.setState({
				restaurants: getRestaurants.data
			})
			// open the results modal
			this.showListModal()
		} catch (err) {
			console.log('\nthere was an error')
			console.log(err)
		}
	}
	// when the user presses "pick another restaurant" in the results modal
	pickAnother = async (e) => {
		e.preventDefault()
		try {
			// repeat handleSubmit process --> post to API with the content from search field
			const sendCity = await fetch(process.env.REACT_APP_CLIENT_APP_URI + '/api/v1/restaurantsga/city', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify({
					city: this.state.city				
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			if (!sendCity.ok) {
				throw Error(sendCity.statusText);
			}
			// response from API
			const getRestaurants = await sendCity.json()
			await this.setState({
				restaurants: getRestaurants.data
			})
		} catch (err) {
			console.log('\nthere was an error')
			console.log(err)
		}
	}
	// when the user's request to the API is returned, the results are displayed in
	// a modal and the search bar is hidden to prevent overlap
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
	// when the user visits their profile, the search bar is hidden and profile is shown
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
	// when the user clicks the home button, they are returned to the search field
	goToMain = () => {
		this.setState({
			profile: false,
			show: false,
			formClass: 'main-form'
		})
	}
	// user can save a restaurant to their profile to return to it later
	saveRestaurant = async (restaurant, e) => {
		e.preventDefault()
		try {
			// posting information of saved restaurant to database, which will save
			// the information in the user's collection of saved restaurants
			const response = await fetch(process.env.REACT_APP_CLIENT_APP_URI + '/api/v1/restaurantsga/save', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify({
					name: restaurant.name,
					formatted_address: restaurant.formatted_address
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			if (!response.ok) {
				throw Error(response.statusText);
			}
		} catch (err) {
			console.log(err)
		}
	}
	// yet to be added --> allows user to clear their saved restaurants
	// will require API call
	resetSave = () => {
		this.setState({
			saved: []
		})
	}
	render() {
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
							<button className="main-form-button" onClick={this.handleSubmit.bind(null, this.state.city)}>Search Your City</button>
						</form>
					}
					{this.state.show ? <Results show={this.state.show} hide={this.hideListModal} restaurants={this.state.restaurants} pickAnother={this.pickAnother} saveRestaurant={this.saveRestaurant}/> : null }
				</div>
			</div>
		)
	}
}

export default Main;