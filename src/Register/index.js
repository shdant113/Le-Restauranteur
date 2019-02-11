import React, { Component } from 'react';
import Login from '../Login';

class Register extends React.Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: ''
		}
	}
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	onSubmit = () => {
		this.props.registrationHandler();
	} 
	render() {
		return (
			<div className="modal">
				<div className="modal-main">
					<form onSubmit={this.onSubmit}>
						<label>
							Username:
							<input type='text' name='username' 
							value={this.state.username} 
							placeholder='username' onChange={this.handleChange} />
						</label>
						<br />
						<label>
							Password:
							<input type='password' name='password' 
							value={this.state.password} onChange={this.handleChange} />
						</label>
						<br />
						<input type='submit' />
					</form>
				</div>
			</div>
		)
	}
}


export default Register;
