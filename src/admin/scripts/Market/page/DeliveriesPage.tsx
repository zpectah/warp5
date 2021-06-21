import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import { Section } from '../../components/ui';

const DeliveriesPage = () => {
	const { t } = useTranslation('page');

	return (
		<Layout.Default
			route={ROUTES.market.deliveries}
			titlePage={t('page:Deliveries.page.title')}
			titleMeta={t('page:Deliveries.meta.title')}
		>
			<Section>
				<div>...Deliveries...</div>
			</Section>
		</Layout.Default>
	);
};

export default DeliveriesPage;
