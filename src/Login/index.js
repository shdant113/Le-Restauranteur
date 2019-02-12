import React, { Component } from 'react';
import Register from '../Register';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			showRegistration: false
		}
	}
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const loginResponse = await fetch('http://localhost:9000/auth/login', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(this.state),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			if (!loginResponse.ok) {
				throw Error(loginResponse.statusText)
			}
			// console.log(loginResponse)
			const parsedResponse = await loginResponse.json();
			// console.log(parsedResponse, ' login response parsed')
			if (parsedResponse.data === 'login information is correct') {
				console.log('login information is correct')
				// // when this login is successful, use the push method to go to the movies route and carry the browser history (basically in array) in the session information
				// const { history } = this.props
				// console.log({ history })
				// history.push('/');
			}
			this.props.loginStatus()
		} catch (err) {
			console.log(err)
			return err
		}
	}
	registrationOpen = () => {
		this.setState({
			showRegistration: true
		})
	}
	registrationHandler = async (state) => {
		console.log('here we are')
		try {
			console.log('are we getting here or not')
			const registrationResponse = await fetch('http://localhost:9000/auth/register', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(state),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			console.log(registrationResponse)
			if (!registrationResponse.ok) {
				throw Error(registrationResponse.statusText)
				console.log(registrationResponse.statusText)
			}
			const parsedResponse = await registrationResponse.json();
			console.log(parsedResponse, ' registration response parsed')
			if (parsedResponse.data.user.username === state.username) {
				this.setState({
					username: state.username,
					password: state.password,
					showRegistration: false
				})
			}
			// this.login();
		} catch (err) {
			console.log('straight to error')
			console.log(err)
			return err
		}
	}
	// login = (e) =>{
	// 	this.props.loginStatus();
	// }	
	render() {
		console.log(this.state)
		return (
			<div>
				<div className="login-wrap">
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
				<div>
					<h3>Don't have an account? Click <button onClick={this.registrationOpen}>here</button>.</h3>
					{ this.state.showRegistration ? <Register registrationHandler={this.registrationHandler} showRegistration={this.state.showRegistration} /> : null}
				</div>
			</div>
		)
	}
}

export default Login