import React from 'react';
import { Switch } from 'react-router-dom';

import { ROUTE_PATH_ATTR_DETAIL_ID, ROUTES } from '../constants';
import AuthRoute from '../utils/AuthRoute';
import DashboardPage from './page/DashboardPage';

const Market = () => {
	return (
		<>
			<Switch>
				<AuthRoute
					path={ROUTES.market.dashboard.path}
					component={DashboardPage}
					auth={ROUTES.market.dashboard.auth}
					exact
				/>
			</Switch>
		</>
	);
};

export default Market;
