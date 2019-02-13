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
	onSubmit = (e) => {
		e.preventDefault()
		this.props.registrationHandler(this.state);
	} 
	render() {
		return (
			<div className="register-modal">
				<div className="register-modal-main">
					<form onSubmit={this.onSubmit}>
						<label>
							Username:
							<br />
							<input type='text' name='username' 
							value={this.state.username} 
							placeholder='username' onChange={this.handleChange} />
						</label>
						<br />
						<label>
							Password:
							<br />
							<input type='password' name='password' 
							value={this.state.password} placeholder='password' onChange={this.handleChange} />
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
