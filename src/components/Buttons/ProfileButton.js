import React, { Component } from 'react';
import PropTypes from 'prop-types';

import avatarImg from '../../assets/avatar.jpg';
import Button from './Button';
import styles from './Buttons.module.css';

class ProfileButton extends Component {
	static propTypes = {
		logout: PropTypes.func.isRequired,
	};

	state = {
		showMenu: false,
	};

	componentWillUnmount() {
		document.removeEventListener('click', this.closeMenu);
	}

	closeMenu = () =>
		this.setState({ showMenu: false }, () => {
			document.removeEventListener('click', this.closeMenu);
		});

	toggleMenu = () =>
		this.setState({ showMenu: !this.state.showMenu }, () => {
			document.addEventListener('click', this.closeMenu);
		});

	render() {
		return (
			<div>
				<button className={styles.ProfileButton} onClick={this.toggleMenu}>
					<img src={avatarImg} alt="Avatar" />
				</button>
				{this.state.showMenu ? (
					<div className={styles.ProfileButton__menu}>
						<Button to="/auth/me" text="Profile" large />
						<Button to="/" text="Logout" large onClick={this.props.logout} />
					</div>
				) : null}
			</div>
		);
	}
}

export default ProfileButton;
