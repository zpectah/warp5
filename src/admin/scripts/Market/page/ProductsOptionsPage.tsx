import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import { Section } from '../../components/ui';

const ProductsOptionsPage = () => {
	const { t } = useTranslation('page');

	return (
		<Layout.Default
			route={ROUTES.market['products-options']}
			titlePage={t('page:ProductsOptions.page.title')}
			titleMeta={t('page:ProductsOptions.meta.title')}
		>
			<Section>
				<div>...ProductsOptions...</div>
				<div>table</div>
				<div>detail</div>
				<div>confirm</div>
			</Section>
		</Layout.Default>
	);
};

export default ProductsOptionsPage;