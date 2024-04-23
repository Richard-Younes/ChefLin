/** @format */

import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import styles from './Login.module.css';
import SpinnerFullPage from '../components/SpinnerFullPage';

export default function Login({ onLogIn }) {
	const [isLoading, setIsLoading] = useState(false);
	if (isLoading) return <SpinnerFullPage />;
	return (
		<div className={styles.login__page}>
			<div className={styles['form-container']}>
				<div>
					<img
						src='./public/Logo.png'
						alt='logo'
						className={styles['form-logo']}
					/>
					<h1 className={`heading-primary ${styles.login__heading}`}>Log In</h1>
					<blockquote className={styles.login__paragraph}>
						&quot;where technology meets tranquility, ensuring a safer aquatic
						experience for all.&quot;
					</blockquote>
					<LoginForm
						onLogIn={onLogIn}
						isLoading={isLoading}
						setIsLoading={setIsLoading}
					/>
				</div>
				<img
					src='./public/login-water.png'
					alt='water moving'
					className={styles['water-image']}
				/>
			</div>
		</div>
	);
}
