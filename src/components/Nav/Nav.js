import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import SVGIcon from '../SVGIcon/SVGIcon';

import Button from '../Buttons/Button';
import Logo from '../Common/Logo';
import ProfileButton from '../Buttons/ProfileButton';
import styles from './Nav.module.css';

const Nav = ({ isAuthenticated, logoutUser, user }) => {
	return (
		<nav className={styles.Nav}>
			<Logo />
			<div className={styles.Nav__links}>
				<NavLink to="/">Story Feed</NavLink>
				<NavLink to="/">Story of the day</NavLink>
			</div>
			<div className={styles.Nav__links__right}>
				{isAuthenticated ? (
					<Fragment>
						<NavLink to="/story/new">
							<SVGIcon icon="Edit2" size="2.5rem" fill="#eb7f76" wrapperClassName={styles.Icon} />
						</NavLink>
						<Button className="navBtn" to="/story/new" text="Tell your story" small />
						<ProfileButton userId={user.id} logout={logoutUser} />
					</Fragment>
				) : (
					<Button red to="/auth" text="Become a Storyteller" />
				)}
			</div>
		</nav>
	);
};

Nav.propTypes = {
	isAuthenticated: PropTypes.bool,
	logoutUser: PropTypes.func.isRequired,
	user: PropTypes.shape({
		id: PropTypes.number,
	}),
};

export default Nav;
