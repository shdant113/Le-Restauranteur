import React, { Component } from 'react';
import '../Profile/index.css';

class New extends React.Component {
	constructor() {
		super();
		this.state = {
			name: '',
			formatted_address: ''
		}
	} 
	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	render() {
		return (
			<div>
				<div className="profile-wrap">
				<h1 className="user-profile-title">Add A New Restaurant</h1>
					<div className="saved-wrap">
						<form onSubmit={this.props.newRestaurant.bind(null, this.state)}>
							<label>
								Name:
								<br />
								<input type='text' name='name' value={this.state.name}
								placeholder='name' onChange={this.onChange} />
							</label>
							<br />
							<label>
								Address:
								<br />
								<input type='text' name='formatted_address' 
								value={this.state.formatted_address}
								placeholder='address'
								onChange={this.onChange} />
							</label>
							<br />
							<input type='submit' />
							<button onClick={this.props.returnToProfile}>Return to Profile</button>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

export default New;