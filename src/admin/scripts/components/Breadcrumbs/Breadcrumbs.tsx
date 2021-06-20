import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

import { appProps, routeProps } from '../../types/types';

interface BreadcrumbsProps {
	route: routeProps;
	app: appProps['app'];
}

const HeaderBreadcrumbs: React.FC<BreadcrumbsProps> = ({ route, app }) => {
	return (
		<>
			<Breadcrumbs aria-label="breadcrumb">
				<Typography color="textPrimary">Warp5</Typography>
				<Typography color="textPrimary">lang</Typography>
				<Typography color="textPrimary">{app}</Typography>
				<Typography color="textPrimary">page</Typography>
				<Typography color="textPrimary">id or panel</Typography>
			</Breadcrumbs>
		</>
	);
};

export default HeaderBreadcrumbs;
