import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import { Section } from '../../components/ui';

const BasketsPage = () => {
	const { t } = useTranslation('page');

	return (
		<Layout.Default
			route={ROUTES.market.baskets}
			titlePage={t('page:Baskets.page.title')}
			titleMeta={t('page:Baskets.meta.title')}
		>
			<Section>
				<div>...Baskets...</div>
				<div>table</div>
				<div>detail</div>
				<div>confirm</div>
			</Section>
		</Layout.Default>
	);
};

export default BasketsPage;
