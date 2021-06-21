import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import { Section } from '../../components/ui';

const TagsPage = () => {
	const { t } = useTranslation('page');

	return (
		<Layout.Default
			route={ROUTES.app.tags}
			titlePage={t('page:Tags.page.title')}
			titleMeta={t('page:Tags.meta.title')}
		>
			<Section>
				<div>...Tags...</div>
			</Section>
		</Layout.Default>
	);
};

export default TagsPage;
