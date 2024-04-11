/**
 * eslint-disable react/prop-types
 *
 * @format
 */

/** @format */

import { useEffect, useState } from 'react';
import './css/login.css';
import waterImage from './assets/login-water.png';
import logo from './assets/Logo.png';
import { useNavigate } from 'react-router-dom';

const loginAPI =
	'https://fyp-aquaguard-django.onrender.com/aquaguard/api/login/';

// eslint-disable-next-line react/prop-types
export default function Login({ onLogIn }) {
	return (
		<div className='login__page'>
			<div className='form-container'>
				<div>
					<img src={logo} alt='logo' className='form-logo' />
					<h1 className='heading-primary login__heading'>Log In</h1>
					<blockquote className='login__paragraph'>
						&quot;where technology meets tranquility, ensuring a safer aquatic
						experience for all.&quot;
					</blockquote>
					<Form onLogIn={onLogIn} />
				</div>
				<img src={waterImage} alt='water moving' className='water-image' />
			</div>
		</div>
	);
}

// eslint-disable-next-line react/prop-types
function Form({ onLogIn }) {
	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');
	const navigate = useNavigate();

	const savedCredentials = localStorage.getItem('credentials');

	useEffect(() => {
		if (savedCredentials) {
			onLogIn();
			navigate('/monitoring');
		}
	}, [navigate, onLogIn, savedCredentials]);

	function onSubmit(e) {
		e.preventDefault();

		async function sendData() {
			const data = {
				username: email,
				password: pass,
			};
			try {
				const response = await fetch(loginAPI, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				});
				localStorage.setItem('credentials', JSON.stringify(data));
				if (response.ok) {
					// If login is successful, save the credentials in local storage
					console.log('Login successful!');
					onLogIn();
					navigate('/monitoring');
				} else {
					// If login fails, display an error message
					const res = await response.json();
					console.error(`Login failed: ${res.detail} `);
				}
			} catch (error) {
				// Handle any network errors or other errors that occur during the login process
				console.error('There was a problem with the login:', error);
			}
		}

		sendData();
	}

	return (
		<form className='login-form' onSubmit={onSubmit}>
			<input
				type='text'
				placeholder='Username'
				className='login-input'
				required
				onChange={e => setEmail(e.target.value)}
			/>
			<input
				type='password'
				placeholder='Password'
				className='login-input'
				required
				onChange={e => setPass(e.target.value)}
			/>
			<a href='#' className='link link__password'>
				Forgot password?
			</a>
			<hr className='line' />
			<button className='btn btn__login'>
				Log in <span>&#8594;</span>
			</button>
		</form>
	);
}
