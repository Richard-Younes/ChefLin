/** @format */
import styles from './LoginForm.module.css';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const loginAPI =
	'https://fyp-aquaguard-django.onrender.com/aquaguard/api/login/';

function LoginForm({ setIsLoading, setIsLoggedIn }) {
	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');
	const navigate = useNavigate();

	const storedCredentials = localStorage.getItem('credentials');
	useEffect(() => {
		if (storedCredentials) {
			setIsLoggedIn(true);
			navigate('/monitoring');
		}
	}, []);

	function onSubmit(e) {
		e.preventDefault();

		async function sendData() {
			const data = {
				username: email,
				password: pass,
			};
			try {
				setIsLoading(true);
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

					localStorage.setItem('credentials', JSON.stringify(data));

					navigate('/monitoring');
				} else {
					// If login fails, display an error message
					const res = await response.json();
					console.error(`Login failed: ${res.detail} `);
				}
			} catch (error) {
				// Handle any network errors or other errors that occur during the login process
				console.error('There was a problem with the login:', error);
			} finally {
				setIsLoading(false);
			}
		}

		sendData();
	}

	return (
		<form className={styles['login-form']} onSubmit={onSubmit}>
			<input
				type='text'
				placeholder='Username'
				className={styles['login-input']}
				required
				onChange={e => setEmail(e.target.value)}
			/>
			<input
				type='password'
				placeholder='Password'
				className={styles['login-input']}
				required
				onChange={e => setPass(e.target.value)}
			/>
			<a href='/' className={`link ${styles.link__password}`}>
				Forgot password?
			</a>
			<hr className={styles.line} />
			<button className='btn btn__login'>
				Log in <span>&#8594;</span>
			</button>
		</form>
	);
}

export default LoginForm;
