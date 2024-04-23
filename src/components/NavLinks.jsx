/** @format */
import { NavLink } from 'react-router-dom';
import styles from './NavLinks.module.css';
function NavLinks() {
	return (
		<div className={styles.navbar__links}>
			<p to='#' className={`${styles.navbar__link} ${styles.navbar__logo}`}>
				AquaGuard
			</p>
			<NavLink to='/monitoring' className={styles.navbar__link}>
				Monitoring
			</NavLink>
			<NavLink to='/analytics' className={styles.navbar__link}>
				Analytics
			</NavLink>
			<NavLink to='/camera-feed' className={styles.navbar__link}>
				Camera Feed
			</NavLink>
			<NavLink to='/help' className={styles.navbar__link}>
				Help
			</NavLink>
		</div>
	);
}

export default NavLinks;
