import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import Dashboard from '../../components/Dashboard';
import { Section } from '../../components/ui';

const DashboardPage = () => {
	const { t } = useTranslation('page');

	return (
		<Layout.Default
			route={ROUTES.market.dashboard}
			titlePage={t('page:MarketDashboard.page.title')}
			titleMeta={t('page:MarketDashboard.meta.title')}
		>
			<Section>
				<Dashboard.Market />
			</Section>
		</Layout.Default>
	);
};

export default DashboardPage;
