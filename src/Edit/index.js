import React from 'react';
import '../Profile/index.css';


const Edit = (props) => {
	return (
		<div>
			<div className="profile-wrap">
				<h1 className="user-profile-title">Edit Your Saved Restaurant</h1>
				<div className="saved-wrap">
					<form className="profile-form" onSubmit={props.updateRestaurant}>
						<label>
							Name:
							<br />
							<input type='text' name='name'
							placeholder={props.editingRestaurant.name} 
							onChange={props.onChange} />
						</label>
						<br />
						<label>
							Address:
							<br />
							<input type='text' name='formatted_address' 
							placeholder={props.editingRestaurant.formatted_address}
							onChange={props.onChange} />
						</label>
						<br />
						<input type='submit' />
						<br />
						<button className="profile-button" onClick={props.returnToProfile}>Return to Profile</button>
					</form>
				</div>
			</div>
		</div>
	)
}
// class Edit extends React.Component {
// 	constructor() {
// 		super();
// 		this.state = {
// 			name: '',
// 			formatted_address: ''
// 		}
// 	} 
// 	onChange = (e) => {
// 		this.setState({
// 			[e.target.name]: e.target.value
// 		})
// 	}
// 	render() {
// 		console.log(this.state)
		
// 	}
// }

export default Edit;