 import React from 'react';
import './index.css'

const Profile = (props) => {
	console.log(props)
	const getSavedRestaurants = props.saved.map((restaurants, i) => {
		return (
			<li key={i} className="user-profile-restaurants">
				{ restaurants }
				<hr />
			</li>
		)
	})
	return (
		<div className="profile-wrap">
			<h1 className="user-profile-title">Your Saved Restaurants</h1>
			<h3 className="user-profile-restaurants">{getSavedRestaurants}</h3>
			<button onClick={props.closeProfile}>Back To Search</button>
		</div>
	)
}

export default Profile;