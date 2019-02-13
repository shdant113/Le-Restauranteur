import React from 'react';
import '../Profile/index.css';

const Edit = (props) => {
	return (
		<div className="profile-wrap">
			<h1 className="user-profile-title">Edit Your Saved Restaurant</h1>
			<div className="saved-wrap">
				<form onSubmit={props.returnToProfile}>
					<label>
						Name:
						<br />
						<input type='text' name='name' 
						placeholder='name' onChange={props.onChange} />
					</label>
					<br />
					<label>
						Address:
						<br />
						<input type='text' name='formatted_address' 
						placeholder='address'
						value={props.editingRestaurant.address}
						onChange={props.onChange} />
					</label>
					<br />
					<input type='submit' />
				</form>
			</div>
		</div>
	)
}

export default Edit;