import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import { Section, CreateButton } from '../../components/ui';

const CategoriesPage = () => {
	const { t } = useTranslation(['common', 'page']);

	return (
		<Layout.Default
			route={ROUTES.app.categories}
			titlePage={t('page:Categories.page.title')}
			titleMeta={t('page:Categories.meta.title')}
			headerChildren={
				<>
					<CreateButton href={ROUTES.app.categories.path} newDetailSuffix>
						{t('btn_new.Categories')}
					</CreateButton>
				</>
			}
		>
			<Section>
				<div>...Categories...</div>
				<div>table</div>
				<div>detail</div>
				<div>confirm</div>
			</Section>
		</Layout.Default>
	);
};

export default CategoriesPage;
