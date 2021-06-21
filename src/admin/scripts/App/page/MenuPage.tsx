import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import { Section } from '../../components/ui';
import CreateButton from '../../components/ui/Button/CreateButton';

const MenuPage = () => {
	const { t } = useTranslation('page');

	return (
		<Layout.Default
			route={ROUTES.app.menu}
			titlePage={t('page:Menu.page.title')}
			titleMeta={t('page:Menu.meta.title')}
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
				<div>...Menu...</div>
				<div>table</div>
				<div>detail</div>
				<div>confirm</div>
			</Section>
		</Layout.Default>
	);
};

export default MenuPage;
