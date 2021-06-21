import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import { Section } from '../../components/ui';

const UploadsPage = () => {
	const { t } = useTranslation('page');

	return (
		<Layout.Default
			route={ROUTES.app.uploads}
			titlePage={t('page:Uploads.page.title')}
			titleMeta={t('page:Uploads.meta.title')}
		>
			<Section>
				<div>...Uploads...</div>
				<div>table</div>
				<div>detail</div>
				<div>confirm</div>
			</Section>
		</Layout.Default>
	);
};

export default UploadsPage;
