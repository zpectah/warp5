import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import { Section } from '../../components/ui';
import SettingsForm from '../../components/Settings';

const SettingsPage = () => {
	const { t } = useTranslation('page');

	return (
		<Layout.Default
			route={ROUTES.app.settings}
			titlePage={t('page:Settings.page.title')}
			titleMeta={t('page:Settings.meta.title')}
		>
			<Section>
				<SettingsForm />
			</Section>
		</Layout.Default>
	);
};

export default SettingsPage;
