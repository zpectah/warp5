import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import { Section } from '../../components/ui';

const PagesPage = () => {
	const { t } = useTranslation('page');

	return (
		<Layout.Default
			route={ROUTES.app.pages}
			titlePage={t('page:Pages.page.title')}
			titleMeta={t('page:Pages.meta.title')}
		>
			<Section>
				<div>...Pages...</div>
			</Section>
		</Layout.Default>
	);
};

export default PagesPage;
