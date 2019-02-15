import React, { Component } from 'react';
import './index.css';
import Edit from '../Edit';
import New from '../New';

class Profile extends React.Component {
	constructor() {
		super();
		this.state = {
			saved: [],
			editingRestaurant: {
				name: '',
				formatted_address: '',
				_id: null
			},
			showEdit: false,
			showNew: false,
			profileWrap: "profile-wrap"
		}
	} 
	componentDidMount() {
		this.getSavedRestaurants()
	}
	// to access user's collection of saved restaurants
	getSavedRestaurants = async () => {
		try {
			// getting data from database
			const response = await fetch(process.env.REACT_APP_CLIENT_APP_URI + '/api/v1/restaurantsga/getsaved', {
				method: 'GET',
				credentials: 'include'
			})
			if (!response.ok) {
				throw Error(response.statusText)
			}
			// response from database
			const parsedResponse = await response.json();
			this.setState({
				saved: parsedResponse.data
			})
		} catch (err) {
			console.log(err)
			return err
		}
	}
	// when the user changes the values of the restaurant they are editing
	onChange = (e) => {
		this.setState({
			editingRestaurant: {
				...this.state.editingRestaurant,
				[e.currentTarget.name]: e.currentTarget.value
			}
		})
	}
	// grabbing the restaurant that the user chooses to edit displays the edit form
	// and hides the profile page
	editChoice = (restaurant, e) => {
		e.preventDefault()
		this.setState({
			showEdit: true,
			profileWrap: "display-none",
			editingRestaurant: {
				name: restaurant.name,
				formatted_address: restaurant.formatted_address,
				_id: restaurant._id
			}
		})
	}
	// updating the restaurant based on the new data the user inputs
	updateRestaurant = async (e) => {
		e.preventDefault()
		try {
			// sending new information to the database
			const updateRestaurant = await fetch(process.env.REACT_APP_CLIENT_APP_URI + '/api/v1/restaurantsga/' + this.state.editingRestaurant._id, {
				method: 'PUT',
				credentials: 'include',
				body: JSON.stringify(this.state.editingRestaurant),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (!updateRestaurant.ok) {
				throw Error(updateRestaurant.statusText)
			}
			// response from database
			const parsedResponse = await updateRestaurant.json();
			// mapping over the array of saved restaurants
			// when the edited restaurant id is found, the old data will be replaced
			// with the new data and state updated to match
			const editedRestaurants = this.state.saved.map((restaurant) => {
				if (restaurant._id === this.state.editingRestaurant._id) {
					restaurant = parsedResponse.data;
				}
				return restaurant
			})
			// state updates with new data, edit form is hidden and profile rendered
			this.setState({
				saved: editedRestaurants,
				showEdit: false,
				profileWrap: "profile-wrap",
				editingRestaurant: {
					name: '',
					formatted_address: '',
					_id: null
				}
			})
		} catch (err) {
			console.log('there was an error')
			return err
		}
	}
	// when the user chooses to add a new restaurant to their saved collection manually
	// the profile will be hidden and the new form appears
	newEntry = async (e) => {
		e.preventDefault()
		this.setState({
			showNew: true,
			profileWrap: "display-none"
		})
	}
	newRestaurant = async (restaurant, e) => {
		e.preventDefault()
		try {
			// posting inputted form data to the database
			const createNewRestaurant = await fetch(process.env.REACT_APP_CLIENT_APP_URI + '/api/v1/restaurantsga/', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(restaurant),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			if (!createNewRestaurant.ok) {
				throw Error(createNewRestaurant.statusText)
			}
			// response from database
			const parsedResponse = await createNewRestaurant.json();
			// adding new restaurant to existing collection and hiding the form
			this.setState({
				saved: [...this.state.saved, parsedResponse.data],
				showNew: false,
				profileWrap: "profile-wrap"
			})
		} catch (err) {
			console.log('there was an error')
			return err
		}
	}
	// removing a restaurant from the saved collection
	// does not remove it from the API, only their collection
	removeRestaurant = async (id, e) => {
		e.preventDefault();
		try {
			// sending a delete request to the database
			const removeChosen = await fetch(process.env.REACT_APP_CLIENT_APP_URI + '/api/v1/restaurantsga/' + id, {
				method: 'DELETE',
				credentials: 'include'
			})
			// response from database
			const deleteParsedData = await removeChosen.json();
			// filtering out restaurant that matches the id of the one chosen to delete
			this.setState({
				saved: this.state.saved.filter((restaurant) => {
					return restaurant._id !== id
				})
			});
		} catch (err) {
			console.log('there was an error')
			return err
		}
	}
	// if the user wants to leave the edit or new restaurant form, they can press
	// the "return to profile" button and exit the form
	returnToProfile = (e) => {
		this.setState({
			showNew: false,
			showEdit: false,
			profileWrap: "profile-wrap"
		})
	}
	render() {
		const mappedRestaurants = this.state.saved.map((restaurants, i) => {
			return (
				<li key={restaurants._id}>
					{restaurants.name}
					<br />
					{restaurants.formatted_address}
					<br /><br />
					<button className="profile-button" onClick={this.editChoice.bind(null, restaurants)}>Edit This Restaurant</button>
					<br />
					<button className="profile-button" onClick={this.removeRestaurant.bind(null, restaurants._id)}>Remove This Restaurant</button>
					<hr />
				</li>
			)
		})
		return (
			<div>
				<div className={this.state.profileWrap}>
					<h1 className="user-profile-title">Your Saved Restaurants</h1>
					<button onClick={this.newEntry}>Add a New Restaurant</button>
					<hr />
					<div className="saved-wrap">
						<h3 className="user-profile-restaurants">{mappedRestaurants}</h3>
					</div>
					<button onClick={this.props.closeProfile}>Back To Search</button>
				</div>
				{ this.state.showEdit ? <Edit updateRestaurant={this.updateRestaurant}
				onChange={this.onChange} editingRestaurant={this.state.editingRestaurant}
				returnToProfile={this.returnToProfile} /> : null }
				{ this.state.showNew ? <New newRestaurant={this.newRestaurant} 
				returnToProfile={this.returnToProfile}
				/> : null }
			</div>
		)
	}
}

export default Profile;