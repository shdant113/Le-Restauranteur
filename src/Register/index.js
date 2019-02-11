import React, { Component } from 'react';

class Register extends React.Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: ''
		}
	}
	onSubmit = () => {
		this.props.registrationHandler();
	} 
	render() {
		return (
			<div>
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
		)
	}
}


export default Register;
