import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Header.module.css';
import Logo from '../Common/Logo';
import Button from '../Common/Button';

export default class Header extends Component {
	render() {
		return (
			<header>
				<nav className={styles.Nav}>
					<Logo />
					<div className={styles.Nav__links}>
						<NavLink to="/">News</NavLink>
						<NavLink to="/">Nature</NavLink>
						<NavLink to="/">Travel</NavLink>
						<NavLink to="/">Culture</NavLink>
					</div>
					<Button />
				</nav>
			</header>
		);
	}
}
