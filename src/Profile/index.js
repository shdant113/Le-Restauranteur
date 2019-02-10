import React from 'react';

const Profile = (props) => {
	return (
		<div>
			<h1>this is a user profile</h1>
			<button onClick={props.closeProfile}>Back To Search</button>
		</div>
	)
}

export default Profile;