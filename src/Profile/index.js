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
	getSavedRestaurants = async () => {
		try {
			const response = await fetch(process.env.REACT_APP_PATH + '/api/v1/restaurantsga/getsaved', {
				method: 'GET',
				credentials: 'include'
			})
			if (!response.ok) {
				throw Error(response.statusText)
			}
			const parsedResponse = await response.json();
			this.setState({
				saved: parsedResponse.data
			})
		} catch (err) {
			console.log(err)
			return err
		}
	}
	onChange = (e) => {
		this.setState({
			editingRestaurant: {
				...this.state.editingRestaurant,
				[e.currentTarget.name]: e.currentTarget.value
			}
		})
	}
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
	updateRestaurant = async (e) => {
		e.preventDefault()
		console.log('entering try catch')
		try {
			console.log('entered try')
			const updateRestaurant = await fetch(process.env.REACT_APP_PATH + '/api/v1/restaurantsga/' + this.state.editingRestaurant._id, {
				method: 'PUT',
				credentials: 'include',
				body: JSON.stringify(this.state.editingRestaurant),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			console.log(this.state.editingRestaurant.name)
			console.log(this.state.editingRestaurant.formatted_address)	
			console.log('fetch call happened')
			if (!updateRestaurant.ok) {
				throw Error(updateRestaurant.statusText)
			}
			const parsedResponse = await updateRestaurant.json();
			const editedRestaurants = this.state.saved.map((restaurant) => {
				if (restaurant._id === this.state.editingRestaurant._id) {
					restaurant = parsedResponse;
				}
				return restaurant
			})
			this.setState({
				restaurants: editedRestaurants,
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
			const createNewRestaurant = await fetch(process.env.REACT_APP_PATH + '/api/v1/restaurantsga/', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(restaurant),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			console.log('call done')
			if (!createNewRestaurant.ok) {
				throw Error(createNewRestaurant.statusText)
			}
			console.log('no thrown error')
			const parsedResponse = await createNewRestaurant.json();
			console.log('response parsed')
			this.setState({
				saved: [...this.state.saved, parsedResponse.data],
				showNew: false,
				profileWrap: "profile-wrap"
			})
			console.log('state reset')
		} catch (err) {
			console.log('there was an error')
			return err
		}
	}
	removeRestaurant = async (id, e) => {
		e.preventDefault();
		try {
			const removeChosen = await fetch(process.env.REACT_APP_PATH + '/api/v1/restaurantsga/' + id, {
				method: 'DELETE',
				credentials: 'include'
			})
			const deleteParsedData = await removeChosen.json();
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
		console.log(this.state)
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