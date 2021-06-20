import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';

import themes from '../styles/theme';
import { GLOBAL as GlobalStyles } from '../styles/global';
import {
	ROUTE_PATH_ATTR_DETAIL_ID,
	ROUTE_PATH_ATTR_TOKEN,
	ROUTES,
} from '../constants';
import ThemeService from '../service/ThemeService';
import HelpService from '../service/HelpService';

import AuthRoute from '../utils/AuthRoute';
//
import Error404Page from './page/Error404Page';
import LoginPage from './page/LoginPage';
import LostPasswordPage from './page/LostPasswordPage';
import DashboardPage from './page/DashboardPage';
//
import Members from '../Members';
import Market from '../Market';

const App = () => {
	const store = useSelector((store: any) => store);
	const [theme, setTheme] = useState(themes['default']);

	useEffect(() => {
		onInit();

		return () => {};
	}, []);

	useEffect(() => {
		if (store.theme) setTheme(themes[store.theme]);
	}, [store.theme]);

	const onInit = () => {
		ThemeService.init();
		HelpService.init();
	};

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<>
				<Router>
					<Switch>
						<AuthRoute
							path={['/admin/members']}
							component={Members}
							auth={ROUTES.app.dashboard.auth}
						/>

						<AuthRoute
							path={['/admin/market']}
							component={Market}
							auth={ROUTES.app.dashboard.auth}
						/>

						<Route
							path={[
								ROUTES.app['lost-password'].path,
								ROUTES.app['lost-password'].path + ROUTE_PATH_ATTR_TOKEN,
							]}
							component={LostPasswordPage}
							exact
						/>

						<Route path={ROUTES.app.login.path} component={LoginPage} />

						<AuthRoute
							path={ROUTES.app.dashboard.path}
							component={DashboardPage}
							auth={ROUTES.app.dashboard.auth}
							exact
						/>

						<Route component={Error404Page} />
					</Switch>
				</Router>
			</>
		</ThemeProvider>
	);
};

export default App;
