import React from 'react';
import { Switch } from 'react-router-dom';

import { ROUTE_PATH_ATTR_DETAIL_ID, ROUTES } from '../constants';
import AuthRoute from '../utils/AuthRoute';
import DashboardPage from './page/DashboardPage';
import DeliveriesPage from './page/DeliveriesPage';
import DistributorsPage from './page/DistributorsPage';
import PaymentsPage from './page/PaymentsPage';
import ProducersPage from './page/ProducersPage';
import ProductsPage from './page/ProductsPage';
import ProductsOptionsPage from './page/ProductsOptionsPage';
import StoresPage from './page/StoresPage';

const Market = () => {
	return (
		<>
			<Switch>
				<AuthRoute
					path={[
						ROUTES.market.products.path,
						ROUTES.market.products.path + ROUTE_PATH_ATTR_DETAIL_ID,
					]}
					component={ProductsPage}
					auth={ROUTES.market.products.auth}
					exact
				/>

				<AuthRoute
					path={[
						ROUTES.market['products-options'].path,
						ROUTES.market['products-options'].path + ROUTE_PATH_ATTR_DETAIL_ID,
					]}
					component={ProductsOptionsPage}
					auth={ROUTES.market['products-options'].auth}
					exact
				/>

				<AuthRoute
					path={[
						ROUTES.market.deliveries.path,
						ROUTES.market.deliveries.path + ROUTE_PATH_ATTR_DETAIL_ID,
					]}
					component={DeliveriesPage}
					auth={ROUTES.market.deliveries.auth}
					exact
				/>

				<AuthRoute
					path={[
						ROUTES.market.distributors.path,
						ROUTES.market.distributors.path + ROUTE_PATH_ATTR_DETAIL_ID,
					]}
					component={DistributorsPage}
					auth={ROUTES.market.distributors.auth}
					exact
				/>

				<AuthRoute
					path={[
						ROUTES.market.payments.path,
						ROUTES.market.payments.path + ROUTE_PATH_ATTR_DETAIL_ID,
					]}
					component={PaymentsPage}
					auth={ROUTES.market.payments.auth}
					exact
				/>

				<AuthRoute
					path={[
						ROUTES.market.producers.path,
						ROUTES.market.producers.path + ROUTE_PATH_ATTR_DETAIL_ID,
					]}
					component={ProducersPage}
					auth={ROUTES.market.producers.auth}
					exact
				/>

				<AuthRoute
					path={[
						ROUTES.market.stores.path,
						ROUTES.market.stores.path + ROUTE_PATH_ATTR_DETAIL_ID,
					]}
					component={StoresPage}
					auth={ROUTES.market.stores.auth}
					exact
				/>

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
