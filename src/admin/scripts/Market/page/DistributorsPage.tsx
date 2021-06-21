import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import { Section } from '../../components/ui';

const DistributorsPage = () => {
	const { t } = useTranslation('page');

	return (
		<Layout.Default
			route={ROUTES.market.distributors}
			titlePage={t('page:Distributors.page.title')}
			titleMeta={t('page:Distributors.meta.title')}
		>
			<Section>
				<div>...Distributors...</div>
				<div>table</div>
				<div>detail</div>
				<div>confirm</div>
			</Section>
		</Layout.Default>
	);
};

export default DistributorsPage;
