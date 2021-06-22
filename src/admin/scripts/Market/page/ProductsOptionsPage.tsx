import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import { Section, CreateButton } from '../../components/ui';

const ProductsOptionsPage = () => {
	const { t } = useTranslation(['common', 'page']);

	return (
		<Layout.Default
			route={ROUTES.market['products-options']}
			titlePage={t('page:ProductsOptions.page.title')}
			titleMeta={t('page:ProductsOptions.meta.title')}
			headerChildren={
				<>
					<CreateButton
						href={ROUTES.market['products-options'].path}
						newDetailSuffix
					>
						{t('btn_new.ProductsOptions')}
					</CreateButton>
				</>
			}
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
