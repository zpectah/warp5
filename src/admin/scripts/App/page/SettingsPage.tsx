import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import { Section } from '../../components/ui';

const SettingsPage = () => {
	const { t } = useTranslation('page');

	return (
		<Layout.Default
			route={ROUTES.app.settings}
			titlePage={t('page:Settings.page.title')}
			titleMeta={t('page:Settings.meta.title')}
		>
			<Section>
				<div>...Settings...</div>
				<div>form</div>
			</Section>
		</Layout.Default>
	);
};

export default SettingsPage;
