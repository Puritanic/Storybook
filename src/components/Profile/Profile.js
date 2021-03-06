import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import SVGIcon from '../SVGIcon/SVGIcon';

import { fetchUser } from '../../actions/user';
import avatarImg from '../../assets/avatar.jpg';
import Button from '../Buttons/Button';
import styles from './Profile.module.css';

class Profile extends Component {
	static propTypes = {
		fetchUser: PropTypes.func.isRequired,
		clearProfile: PropTypes.func.isRequired,
		user: PropTypes.shape({
			id: PropTypes.number,
			firstName: PropTypes.string,
			lastName: PropTypes.string,
			email: PropTypes.string,
		}),
		profile: PropTypes.shape({
			id: PropTypes.number,
			firstName: PropTypes.string,
			lastName: PropTypes.string,
			email: PropTypes.string,
		}),
	};

	componentDidMount() {
		if (this.props.match.params.id) {
			const { id } = this.props.match.params;
			this.props.fetchUser(id);
		}
	}

	componentWillUnmount() {
		this.props.clearProfile();
	}

	render() {
		const btnStyles = {
			position: 'absolute',
			top: '1rem',
			right: '1rem',
		};
		const { user, profile } = this.props;
		const userData = this.props.location.pathname.includes('/me') ? user : profile;

		return (
			<section className={styles.Profile}>
				{this.props.location.pathname.includes('/me') ? (
					<Fragment>
						<NavLink to={`/user/edit/${profile.id}`}>
							<SVGIcon icon="Edit2" size="2.5rem" fill="#eb7f76" wrapperClassName={styles.Icon} />
						</NavLink>
						<Button customStyles={btnStyles} text="Edit Profile" small to={`/user/edit/${profile.id}`} />
					</Fragment>
				) : null}
				<img src={avatarImg} alt="Avatar" />
				<h1 className={styles.Profile__heading}>
					{userData.firstName} {userData.lastName}
				</h1>
				<p className={styles.Profile__email}>{userData.email}</p>
				<h4 className={styles.Profile__heading}>Short bio</h4>
				<p className={styles.Profile__bio}>
					ln nglui Shub-Niggurathoth nafm'latgh orr'e n'ghftog nw nog uh'e naflah shtunggli, nali'hee ya
					nilgh'ri lw'nafhyar ron tharanaknyth ch' phlegeth s'uhn ya 'fhalmaoth, hafh'drn y-y'hah sll'ha
					syha'h gothanyth y-Nyarlathotep nach' ee throd. Orr'e ron f'wgah'n c'ai llllyar goka Azathothagl
					Yoggoth s'uhn uh'e ep, h'hlirgh llll lw'nafh y-shugg ah mg athg uh'e n'ghft shagg, ph'wgah'n
					Azathoth ee ph'uh'e mg naflsgn'wahl ooboshu chtenff nw.
				</p>
			</section>
		);
	}
}

const mapStateToProps = state => ({
	profile: state.users.profile,
	user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
	fetchUser: id => dispatch(fetchUser(id)),
	clearProfile: () => dispatch({ type: 'CLEAR_PROFILE' }),
});

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Profile)
);
