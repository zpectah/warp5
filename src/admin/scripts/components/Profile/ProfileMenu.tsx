import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { buttonTrigger } from '../../styles/mixins';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';

import LogoutConfirm from './LogoutConfirm';

const Outer = styled.div``;
const Button = styled.button`
	${buttonTrigger}
`;

interface ProfileMenuProps {
	id?: string;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ id = 'profileMenu' }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [confirmOpen, setConfirmOpen] = useState(false);

	const openHandler = (e) => setAnchorEl(e.currentTarget);

	const closeHandler = () => setAnchorEl(null);

	const helpHandler = () => {
		setAnchorEl(null);

		// TODO
	};

	const profileHandler = () => {
		setAnchorEl(null);

		// TODO
	};

	const logoutHandler = () => {
		setAnchorEl(null);
		setConfirmOpen(true);
	};

	return (
		<>
			<Outer>
				<Button
					aria-controls={id}
					aria-haspopup="true"
					onClick={openHandler}
					type="button"
				>
					<AccountCircle />
				</Button>
				<Menu
					id={id}
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={closeHandler}
				>
					<MenuItem onClick={helpHandler}>Help</MenuItem>
					<MenuItem onClick={profileHandler}>Profile</MenuItem>
					<MenuItem onClick={logoutHandler}>Logout</MenuItem>
				</Menu>
			</Outer>
			<LogoutConfirm
				open={confirmOpen}
				onToggle={(open) => setConfirmOpen(open)}
			/>
		</>
	);
};

export default ProfileMenu;
