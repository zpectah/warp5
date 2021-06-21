import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { isMobileOnly } from 'react-device-detect';

import { NAV_ITEMS, ROUTES } from '../../constants';
import { useProfile, useSettings } from '../../hooks/App';

interface NavbarProps {
	sidebarToggle: Function;
}

const Navbar = ({ sidebarToggle }: NavbarProps) => {
	const { t } = useTranslation(['page']);
	const location = useLocation();
	const { userShouldShow } = useProfile();
	const { Settings } = useSettings();
	const modules = {
		Members: Settings ? Settings['module_members_active'] : false,
		Market: Settings ? Settings['module_market_active'] : false,
	};

	const isSelected = (path) => {
		let selected = false;

		if (
			!(
				path == ROUTES.app.dashboard.path ||
				path == ROUTES.members.dashboard.path ||
				path == ROUTES.market.dashboard.path
			) &&
			location.pathname.includes(path + '/')
		)
			selected = true;

		return selected;
	};

	const linkTrigger = () => {
		isMobileOnly && sidebarToggle();
	};

	return (
		<>
			<List aria-label="main-menu" style={{ paddingTop: 0 }}>
				{NAV_ITEMS.app.map((item) => {
					if (item.active && userShouldShow(item.auth))
						return (
							<ListItem
								button
								selected={isSelected(item.path)}
								key={item.key}
								component={NavLink}
								to={item.path}
								exact
								onClick={linkTrigger}
							>
								<ListItemText primary={t(`page:${item.label}`)} />
							</ListItem>
						);
				})}
				{modules.Members &&
					NAV_ITEMS.members.map((item) => {
						if (item.active && userShouldShow(item.auth))
							return (
								<ListItem
									button
									selected={isSelected(item.path)}
									key={item.key}
									component={NavLink}
									to={item.path}
									exact
									onClick={linkTrigger}
								>
									<ListItemText primary={t(`page:${item.label}`)} />
								</ListItem>
							);
					})}
				{modules.Market &&
					NAV_ITEMS.market.map((item) => {
						if (item.active && userShouldShow(item.auth))
							return (
								<ListItem
									button
									selected={isSelected(item.path)}
									key={item.key}
									component={NavLink}
									to={item.path}
									exact
									onClick={linkTrigger}
								>
									<ListItemText primary={t(`page:${item.label}`)} />
								</ListItem>
							);
					})}
			</List>
		</>
	);
};

export default Navbar;
