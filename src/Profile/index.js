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
			const response = await fetch('http://localhost:9000/api/v1/restaurantsga/getsaved', {
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
			[e.target.name]: e.target.value
		})
	}
	editChoice = (e) => {
		e.preventDefault()
		this.setState({
			showEdit: true,
			profileWrap: "display-none"
		})
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
			const createNewRestaurant = await fetch('http://localhost:9000/api/v1/restaurantsga/', {
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
	returnToProfile = (e) => {
		this.setState({
			showNew: false,
			showEdit: false,
			profileWrap: "profile-wrap"
		})
	}
	render() {
		console.log(this.state)
		const mappedRestaurants = this.state.saved.map((restaurants, i) => {
			return (
				<li key={i}>
					{restaurants.name}
					<br />
					{restaurants.formatted_address}
					<br />
					<button onClick={this.editChoice}>Edit This Restaurant</button>
					<button onClick={this.deleteChoice}>Remove From Your Saved List</button>
					<hr />
				</li>
			)
		})
		return (
			<div>
				<div className={this.state.profileWrap}>
					<h1 className="user-profile-title">Your Saved Restaurants</h1>
					<button onClick={this.newEntry}>Add a New Restaurant</button>
					<div className="saved-wrap">
						<h3 className="user-profile-restaurants">{mappedRestaurants}</h3>
					</div>
					<button onClick={this.props.closeProfile}>Back To Search</button>
				</div>
				{ this.state.showEdit ? <Edit returnToProfile={this.returnToProfile}
				onChange={this.onChange} editingRestaurant={this.state.editingRestaurant}
				 /> : null }
				{ this.state.showNew ? <New newRestaurant={this.newRestaurant} 
				/> : null }
			</div>
		)
	}
}

export default Profile;