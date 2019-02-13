import React, { Component } from 'react';
import './index.css'

class Profile extends React.Component {
	constructor() {
		super();
		this.state = {
			saved: [],
			showEdit: false
		}
	} 
	componentDidMount() {
		this.getSavedRestaurants()
	}
	getSavedRestaurants = async () => {
		try {
			const response = await fetch('http://localhost:9000/api/v1/restaurantsga/returnsaved', {
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
	// mapOverSavedRestaurants = () => {
	// 	this.state.saved.map((restaurants, i) => {
	// 		return (
	// 			<li key={i}>
	// 				{restaurants.name}
	// 				<br />
	// 				{restaurants.formatted_address}
	// 				<hr />
	// 			</li>
	// 		)
	// 	})
	// }
	render() {
		// MAP
		console.log(this.state)
		const mappedRestaurants = this.state.saved.map((restaurants, i) => {
			return (
				<li key={i}>
					{restaurants.name}
					<br />
					{restaurants.formatted_address}
					<hr />
				</li>
			)
		})
		return (
			<div className="profile-wrap">
				<h1 className="user-profile-title">Your Saved Restaurants</h1>
				<h3 className="user-profile-restaurants">{mappedRestaurants}</h3>
				<button onClick={this.props.closeProfile}>Back To Search</button>
			</div>
		)
	}
}

export default Profile;