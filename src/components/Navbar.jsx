/** @format */
import styles from './Navbar.module.css';
import NavLinks from './NavLinks';
import NavProfile from './NavProfile';

export default function NavBar() {
	return (
		<nav className={styles.navbar}>
			<NavLinks />
			<NavProfile />
		</nav>
	);
}
