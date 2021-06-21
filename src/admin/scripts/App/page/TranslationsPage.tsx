import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import { Section } from '../../components/ui';

const TranslationsPage = () => {
	const { t } = useTranslation('page');

	return (
		<Layout.Default
			route={ROUTES.app.translations}
			titlePage={t('page:Translations.page.title')}
			titleMeta={t('page:Translations.meta.title')}
		>
			<Section>
				<div>...Translations...</div>
			</Section>
		</Layout.Default>
	);
};

export default TranslationsPage;
