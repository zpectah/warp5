import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import { Section } from '../../components/ui';
import CreateButton from '../../components/ui/Button/CreateButton';

const TagsPage = () => {
	const { t } = useTranslation('page');

	return (
		<Layout.Default
			route={ROUTES.app.tags}
			titlePage={t('page:Tags.page.title')}
			titleMeta={t('page:Tags.meta.title')}
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
				<div>...Tags...</div>
				<div>table</div>
				<div>detail</div>
				<div>confirm</div>
			</Section>
		</Layout.Default>
	);
};

export default TagsPage;
