import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import { Section, CreateButton } from '../../components/ui';

const ProductsPage = () => {
	const { t } = useTranslation(['common', 'page']);

	return (
		<Layout.Default
			route={ROUTES.market.products}
			titlePage={t('page:Products.page.title')}
			titleMeta={t('page:Products.meta.title')}
			headerChildren={
				<>
					<CreateButton href={ROUTES.market.products.path} newDetailSuffix>
						{t('btn_new.Products')}
					</CreateButton>
				</>
			}
		>
			<Section>
				<div>...Products...</div>
				<div>table</div>
				<div>detail</div>
				<div>confirm</div>
			</Section>
		</Layout.Default>
	);
};

export default ProductsPage;
