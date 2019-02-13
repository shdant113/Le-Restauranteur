 import React, { Component } from 'react';
import './index.css'

class Profile extends React.Component {
	constructor() {
		super();
		this.state = {
			showEdit: false
		}
	} 
	// getSavedRestaurants = () => {
	// 	this.props.saved.map((restaurants, i) => {
	// 		return (
	// 			<li key={i} className="user-profile-restaurants">
	// 				{ restaurants }
	// 			</li>
	// 		)
	// 	})
	// }
	render() {
		return (
			<div className="profile-wrap">
				<h1 className="user-profile-title">Your Saved Restaurants</h1>
				<h3 className="user-profile-restaurants">saved restaurants will print here</h3>
				<button onClick={this.props.closeProfile}>Back To Search</button>
			</div>
		)
	}
}

export default Profile;