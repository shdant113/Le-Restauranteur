import React, { Component } from 'react';

class Login extends Component {
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
	handleSubmit = async (e) => {
		e.preventDefault()
		// try {
		// 	const loginResponse = await fetch('localhost goes here', {
		// 		method: 'POST',
		// 		credentials: 'include',
		// 		body: JSON.stringify(this.state),
		// 		headers: {
		// 			'Content-Type': 'application/json'
		// 		}
		// 	})
		// 	if (!loginResponse.ok) {
		// 		throw Error(loginResponse.statusText)
		// 	}
		// 	// console.log(loginResponse)
		// 	const parsedResponse = await loginResponse.json();
		// 	// console.log(parsedResponse, ' login response parsed')
		// 	if (parsedResponse.data === 'login successful') {
		// 		// when this login is successful, use the push method to go to the movies route and carry the browser history (basically in array) in the session information
		// 		this.props.history.push('/movies');
		// 	}
		this.props.loginStatus();
		// } catch (err) {
		// 	console.log(err)
		// 	return err
		// }
	}
	render() {
		console.log(this.state)
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
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

export default Login