import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import { Section, CreateButton } from '../../components/ui';

const MenuPage = () => {
	const { t } = useTranslation(['common', 'page']);

	return (
		<Layout.Default
			route={ROUTES.app.menu}
			titlePage={t('page:Menu.page.title')}
			titleMeta={t('page:Menu.meta.title')}
			headerChildren={
				<>
					<CreateButton href={ROUTES.app.menu.path} newDetailSuffix>
						{t('btn_new.Menu')}
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
