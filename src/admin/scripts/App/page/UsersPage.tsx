import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import { Section } from '../../components/ui';

const UsersPage = () => {
	const { t } = useTranslation('page');

	return (
		<Layout.Default
			route={ROUTES.app.users}
			titlePage={t('page:Users.page.title')}
			titleMeta={t('page:Users.meta.title')}
		>
			<Section>
				<div>...Users...</div>
				<div>table</div>
				<div>detail</div>
				<div>confirm</div>
			</Section>
		</Layout.Default>
	);
};

export default UsersPage;