import React from 'react';
import { Switch } from 'react-router-dom';

import { ROUTE_PATH_ATTR_DETAIL_ID, ROUTES } from '../constants';
import AuthRoute from '../utils/AuthRoute';
import MembersPage from './page/MembersPage';

const Members = () => {
	return (
		<>
			<Switch>
				<AuthRoute
					path={[
						ROUTES.members.members.path,
						ROUTES.members.members.path + ROUTE_PATH_ATTR_DETAIL_ID,
					]}
					component={MembersPage}
					auth={ROUTES.members.members.auth}
					exact
				/>
			</Switch>
		</>
	);
};

export default Members;
