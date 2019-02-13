import React from 'react';
import './index.css'

const Profile = (props) => {
	return (
		<div className="profile-wrap">
			<h1 className="user-profile-title">Your Saved Restaurants</h1>
			<h3 className="user-profile-restaurants">the restaurants will go here</h3>
			<button onClick={props.closeProfile}>Back To Search</button>
		</div>
	)
}

export default Profile;