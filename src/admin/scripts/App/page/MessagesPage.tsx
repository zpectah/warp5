import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import { Section } from '../../components/ui';

const MessagesPage = () => {
	const { t } = useTranslation('page');

	return (
		<Layout.Default
			route={ROUTES.app.messages}
			titlePage={t('page:Messages.page.title')}
			titleMeta={t('page:Messages.meta.title')}
		>
			<Section>
				<div>...Messages...</div>
			</Section>
		</Layout.Default>
	);
};

export default MessagesPage;
