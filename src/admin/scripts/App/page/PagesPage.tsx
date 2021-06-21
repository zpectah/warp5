import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import { Section } from '../../components/ui';
import CreateButton from '../../components/ui/Button/CreateButton';

const PagesPage = () => {
	const { t } = useTranslation('page');

	return (
		<Layout.Default
			route={ROUTES.app.pages}
			titlePage={t('page:Pages.page.title')}
			titleMeta={t('page:Pages.meta.title')}
			headerChildren={
				<>
					<CreateButton
						onClick={() => {
							console.log('Create callback');
						}}
					>
						Create .-.-.
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
