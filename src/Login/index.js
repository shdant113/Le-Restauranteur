import React, { Component } from 'react';
import Register from '../Register';
import './index.css'

// const loginClass = this.state.showRegistration ? "display-none" : null

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
				this.setState({
					incorrectLogin: false
				})
				this.props.loginStatus()
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
	registrationOpen = () => {
		this.setState({
			showRegistration: true,
			loginClass: 'display-none',
			registrationClass: 'login-register-adjust'
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
					showRegistration: false,
					loginClass: null,
					registrationClass: 'login-register-text'
				})
			}
			this.props.loginStatus()
		} catch (err) {
			console.log('straight to error')
			console.log(err)
			return err
		}
	}
	render() {
		console.log(this.state)
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