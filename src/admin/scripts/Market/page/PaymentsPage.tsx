import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import { Section } from '../../components/ui';

const PaymentsPage = () => {
	const { t } = useTranslation('page');

	return (
		<Layout.Default
			route={ROUTES.market.payments}
			titlePage={t('page:Payments.page.title')}
			titleMeta={t('page:Payments.meta.title')}
		>
			<Section>
				<div>...Payments...</div>
			</Section>
		</Layout.Default>
	);
};

export default PaymentsPage;
