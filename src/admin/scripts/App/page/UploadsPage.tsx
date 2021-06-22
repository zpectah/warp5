import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import { Section, CreateButton } from '../../components/ui';

const UploadsPage = () => {
	const { t } = useTranslation(['common', 'page']);

	return (
		<Layout.Default
			route={ROUTES.app.uploads}
			titlePage={t('page:Uploads.page.title')}
			titleMeta={t('page:Uploads.meta.title')}
			headerChildren={
				<>
					<CreateButton href={ROUTES.app.uploads.path} newDetailSuffix>
						{t('btn_new.Uploads')}
					</CreateButton>
				</>
			}
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
