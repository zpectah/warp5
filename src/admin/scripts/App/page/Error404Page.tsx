import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';

const Error404Page = () => {
	const { t } = useTranslation('page');

	return (
		<Layout.Minimal
			route={ROUTES.app['error-404']}
			titlePage={t('page:Error404.page.title')}
			titleMeta={t('page:Error404.meta.title')}
			noFooter
		>
			...Error404Page...
		</Layout.Minimal>
	);
};

export default Error404Page;
