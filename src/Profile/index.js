import React, { Component } from 'react';
import './index.css'

class Profile extends React.Component {
	constructor() {
		super();
		this.state = {
			saved: [],
			name: '',
			formatted_address: '',
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
	newEntry = (e) => {
		e.preventDefault()
		this.setState({
			showNew: true,
			profileWrap: "display-none"
		})
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
				<div>
					{ this.state.showEdit ?
						<div className="profile-wrap">
						<h1 className="user-profile-title">Edit Your Saved Restaurant</h1>
							<div className="saved-wrap">
								<form onSubmit={this.returnToProfile}>
									<label>
										Name:
										<br />
										<input type='text' name='name' 
										placeholder='name' onChange={this.handleChange} />
									</label>
									<br />
									<label>
										Address:
										<br />
										<input type='text' name='formatted_address' 
										placeholder='address'
										onChange={this.handleChange} />
									</label>
									<br />
									<input type='submit' />
								</form>
							</div>
						</div>
						: null 
					}
				</div>
				<div>
					{ this.state.showNew ?
						<div className="profile-wrap">
						<h1 className="user-profile-title">Add A New Restaurant</h1>
							<div className="saved-wrap">
								<form onSubmit={this.returnToProfile}>
									<label>
										Name:
										<br />
										<input type='text' name='name' 
										placeholder='name' onChange={this.handleChange} />
									</label>
									<br />
									<label>
										Address:
										<br />
										<input type='text' name='formatted_address' 
										placeholder='address'
										onChange={this.handleChange} />
									</label>
									<br />
									<input type='submit' />
								</form>
							</div>
						</div>
						: null 
					}
				</div>
			</div>
		)
	}
}

export default Profile;