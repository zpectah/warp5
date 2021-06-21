import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import { Section } from '../../components/ui';

const ProducersPage = () => {
	const { t } = useTranslation('page');

	return (
		<Layout.Default
			route={ROUTES.market.producers}
			titlePage={t('page:Producers.page.title')}
			titleMeta={t('page:Producers.meta.title')}
		>
			<Section>
				<div>...Producers...</div>
			</Section>
		</Layout.Default>
	);
};

export default ProducersPage;
