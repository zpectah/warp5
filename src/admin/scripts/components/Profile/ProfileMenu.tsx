import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Chip from '@material-ui/core/Chip';
import { isMobileOnly } from 'react-device-detect';
import styled from 'styled-components';

import config from '../../config';
import { THEMES } from '../../constants';
import { buttonTrigger } from '../../styles/mixins';
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
	const { t, i18n } = useTranslation(['types', 'component']);
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
					{THEMES.length > 1 && (
						<MenuItem onClick={themeHandler}>
							{t('component:ProfileMenu.theme_link')}&nbsp;&nbsp;
							<Chip
								size="small"
								label={t(`types:${store.ui.theme}`)}
								variant="default"
							/>
						</MenuItem>
					)}
					{config.GLOBAL.CMS.LANG_LIST.length > 1 && (
						<MenuItem onClick={localesHandler}>
							{t('component:ProfileMenu.locale_link')}&nbsp;&nbsp;
							<Chip
								size="small"
								label={config.LOCALES_LIST[i18n.language].label}
								variant="default"
							/>
						</MenuItem>
					)}
					<Divider />
					<MenuItem onClick={helpHandler}>
						{t('component:ProfileMenu.help_link')}
					</MenuItem>
					<MenuItem onClick={profileHandler}>
						{t('component:ProfileMenu.profile_link')}
					</MenuItem>
					{isMobileOnly && (
						<>
							<Divider />
							<MenuItem onClick={logoutHandler}>
								{t('component:ProfileMenu.logout_link')}
							</MenuItem>
						</>
					)}
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
