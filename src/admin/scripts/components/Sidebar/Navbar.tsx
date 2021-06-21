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
	sidebarClose: Function;
}

const Navbar = ({ sidebarClose }: NavbarProps) => {
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
			(!(
				path == ROUTES.app.dashboard.path ||
				path == ROUTES.market.dashboard.path
			) &&
				location.pathname.includes(path + '/')) ||
			location.pathname == path ||
			location.pathname == path + '/'
		)
			selected = true;

		return selected;
	};

	const linkTrigger = () => {
		isMobileOnly && sidebarClose();
	};

	const renderItems = (items) => {
		return items.map((item) => {
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
						activeClassName={'is-active'}
					>
						<ListItemText primary={t(`page:${item.label}`)} />
					</ListItem>
				);
		});
	};

	return (
		<>
			<List aria-label="main-menu" style={{ paddingTop: 0 }}>
				{renderItems(NAV_ITEMS.app)}
				{modules.Members && renderItems(NAV_ITEMS.members)}
				{modules.Market && renderItems(NAV_ITEMS.market)}
			</List>
		</>
	);
};

export default Navbar;
