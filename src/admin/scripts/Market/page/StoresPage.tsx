import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import { Section } from '../../components/ui';

const StoresPage = () => {
	const { t } = useTranslation('page');

	return (
		<Layout.Default
			route={ROUTES.market.stores}
			titlePage={t('page:Stores.page.title')}
			titleMeta={t('page:Stores.meta.title')}
		>
			<Section>
				<div>...Stores...</div>
			</Section>
		</Layout.Default>
	);
};

export default StoresPage;
