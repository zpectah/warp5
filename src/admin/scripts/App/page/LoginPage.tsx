import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import LoginForm from '../../components/Login';

const LoginPage = () => {
	const { t } = useTranslation('page');

	return (
		<Layout.Minimal
			route={ROUTES.app.login}
			titlePage={t('page:Login.page.title')}
			titleMeta={t('page:Login.meta.title')}
		>
			<LoginForm />
		</Layout.Minimal>
	);
};

export default LoginPage;
