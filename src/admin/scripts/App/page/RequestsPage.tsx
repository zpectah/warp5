import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import { Section } from '../../components/ui';

const RequestsPage = () => {
	const { t } = useTranslation('page');

	return (
		<Layout.Default
			route={ROUTES.app.requests}
			titlePage={t('page:Requests.page.title')}
			titleMeta={t('page:Requests.meta.title')}
		>
			<Section>
				<div>...Requests...</div>
			</Section>
		</Layout.Default>
	);
};

export default RequestsPage;
