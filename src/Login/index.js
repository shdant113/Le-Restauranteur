import React, { Component } from 'react';
import Register from '../Register';
import './index.css'

class Login extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			showRegistration: false,
			incorrectLogin: false,
			loginClass: null,
			registrationClass: 'login-register-text'
		}
	}
	// when the user types in the login form
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	// when the user presses "submit" on log in form
	handleSubmit = async (e) => {
		e.preventDefault()
		try {
			// posting to user database to authenticate login
			const loginResponse = await fetch(process.env.REACT_APP_CLIENT_APP_URI + '/api/v1/auth/login', {
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
			// response from database
			const parsedResponse = await loginResponse.json();
			// if the login information (username/password) is correct, there will be
			// no incorrect login message displayed and the user is logged in successfully
			if (parsedResponse.data === 'login information is correct') {
				this.setState({
					incorrectLogin: false
				})
				this.props.loginStatus()
			// if the login information (username/password) is incorrect, there will be
			// an incorrect login message displayed and the form holding the inputted
			// username and password will be cleared
			} else {
				this.setState({
					incorrectLogin: true,
					username: '',
					password: ''
				})
			}
		} catch (err) {
			console.log(err)
			return err
		}
	}
	// when the registration page is opened, the registration modal appears and the
	// login form disappears from the page
	registrationOpen = () => {
		this.setState({
			showRegistration: true,
			loginClass: 'display-none',
			registrationClass: 'login-register-adjust'
		})
	}
	// when the user has submitted their registration information, the onSubmit function
	// passes the responsibility of registering the user to this function
	registrationHandler = async (state) => {
		try {
			// posting user registration data to the database for authentication
			const registrationResponse = await fetch(process.env.REACT_APP_CLIENT_APP_URI + '/api/v1/auth/register', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(state),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			if (!registrationResponse.ok) {
				throw Error(registrationResponse.statusText)
			}
			// response from database
			const parsedResponse = await registrationResponse.json();
			// if the username from the database matches the one they inputted into the form
			// then they will be pushed through the login process as a newly registered
			// user does not need to log in
			if (parsedResponse.data.user.username === state.username) {
				this.setState({
					username: state.username,
					password: state.password,
					showRegistration: false,
					loginClass: null,
					registrationClass: 'login-register-text'
				})
			}
			this.props.loginStatus()
		} catch (err) {
			console.log(err)
			return err
		}
	}
	render() {
		return (
			<div className="login-wrap">
				<div>
					<h1 className="header-h1-login">
						Le Restauranteur
					</h1>
				</div>
				<div className={this.state.loginClass}>
					{ this.state.incorrectLogin ? <h2 className="login-first-h2">Incorrect login, please try again.</h2> : <h2 className="login-first-h2">Already have an account? Log in below.</h2> }
					<form className="login-form" onSubmit={this.handleSubmit}>
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
							value={this.state.password} placeholder='password'onChange={this.handleChange} />
						</label>
						<br />
						<input type='submit' />
					</form>
				</div>
				<div className={this.state.registrationClass}>
					{ !this.state.showRegistration ? <h2>Don't have an account? Click <a className="login-a" onClick={this.registrationOpen}>here</a>.</h2> :
					<h2>Register your account below.</h2> }
					{ this.state.showRegistration ? <Register registrationHandler={this.registrationHandler} showRegistration={this.state.showRegistration} /> : null}
				</div>
			</div>
		)
	}
}

export default Login