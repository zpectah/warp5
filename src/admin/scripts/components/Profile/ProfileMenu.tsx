import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { buttonTrigger } from '../../styles/mixins';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';

import ThemesDialog from '../Themes/ThemesDialog';
import LocalesDialog from '../Locales/LocalesDialog';
import ProfileDialog from './ProfileDialog';
import LogoutConfirm from './LogoutConfirm';
import HelpDialog from '../Help';

const Outer = styled.div``;
const Button = styled.button`
	${buttonTrigger}
`;

interface ProfileMenuProps {
	id?: string;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ id = 'profileMenu' }) => {
	const { i18n } = useTranslation();
	const store = useSelector((store: any) => store);
	const [anchorEl, setAnchorEl] = useState(null);
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [profileOpen, setProfileOpen] = useState(false);
	const [helpOpen, setHelpOpen] = useState(false);
	const [themeOpen, setThemeOpen] = useState(false);
	const [localesOpen, setLocalesOpen] = useState(false);

	const openHandler = (e) => setAnchorEl(e.currentTarget);

	const closeHandler = () => setAnchorEl(null);

	const helpHandler = () => {
		setAnchorEl(null);
		setHelpOpen(true);
	};

	const profileHandler = () => {
		setAnchorEl(null);
		setProfileOpen(true);
	};

	const logoutHandler = () => {
		setAnchorEl(null);
		setConfirmOpen(true);
	};

	const themeHandler = () => {
		setAnchorEl(null);
		setThemeOpen(true);
	};

	const localesHandler = () => {
		setAnchorEl(null);
		setLocalesOpen(true);
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
					<MenuItem onClick={themeHandler}>Theme ({store.ui.theme})</MenuItem>
					<MenuItem onClick={localesHandler}>
						Language ({i18n.language})
					</MenuItem>
					<MenuItem onClick={helpHandler}>Help</MenuItem>
					<MenuItem onClick={profileHandler}>Profile</MenuItem>
					<MenuItem onClick={logoutHandler}>Logout</MenuItem>
				</Menu>
			</Outer>
			<ThemesDialog open={themeOpen} onToggle={(open) => setThemeOpen(open)} />
			<LocalesDialog
				open={localesOpen}
				onToggle={(open) => setLocalesOpen(open)}
			/>
			<ProfileDialog
				open={profileOpen}
				onToggle={(open) => setProfileOpen(open)}
			/>
			<HelpDialog open={helpOpen} onToggle={(open) => setHelpOpen(open)} />
			<LogoutConfirm
				open={confirmOpen}
				onToggle={(open) => setConfirmOpen(open)}
			/>
		</>
	);
};

export default ProfileMenu;
