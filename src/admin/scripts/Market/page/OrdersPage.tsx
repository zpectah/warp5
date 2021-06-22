import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import { Section } from '../../components/ui';

const OrdersPage = () => {
	const { t } = useTranslation('page');

	return (
		<Layout.Default
			route={ROUTES.market.orders}
			titlePage={t('page:Orders.page.title')}
			titleMeta={t('page:Orders.meta.title')}
		>
			<Section>
				<div>...Orders...</div>
				<div>table</div>
				<div>detail</div>
				<div>confirm</div>
			</Section>
		</Layout.Default>
	);
};

export default OrdersPage;
