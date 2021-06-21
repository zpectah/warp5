import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import { Section } from '../../components/ui';

const MembersPage = () => {
	const { t } = useTranslation('page');

	return (
		<Layout.Default
			route={ROUTES.members.members}
			titlePage={t('page:Members.page.title')}
			titleMeta={t('page:Members.meta.title')}
		>
			<Section>
				<div>...Members...</div>
			</Section>
		</Layout.Default>
	);
};

export default MembersPage;
