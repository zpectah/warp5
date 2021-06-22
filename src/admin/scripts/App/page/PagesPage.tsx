import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import { Section, CreateButton } from '../../components/ui';

const PagesPage = () => {
	const { t } = useTranslation(['common', 'page']);

	return (
		<Layout.Default
			route={ROUTES.app.pages}
			titlePage={t('page:Pages.page.title')}
			titleMeta={t('page:Pages.meta.title')}
			headerChildren={
				<>
					<CreateButton href={ROUTES.app.pages.path} newDetailSuffix>
						{t('btn_new.Pages')}
					</CreateButton>
				</>
			}
		>
			<Section>
				<div>...Pages...</div>
				<div>table</div>
				<div>detail</div>
				<div>confirm</div>
			</Section>
		</Layout.Default>
	);
};

export default PagesPage;
