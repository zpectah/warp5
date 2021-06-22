import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import { Section, CreateButton } from '../../components/ui';

const DeliveriesPage = () => {
	const { t } = useTranslation(['common', 'page']);

	return (
		<Layout.Default
			route={ROUTES.market.deliveries}
			titlePage={t('page:Deliveries.page.title')}
			titleMeta={t('page:Deliveries.meta.title')}
			headerChildren={
				<>
					<CreateButton href={ROUTES.market.deliveries.path} newDetailSuffix>
						{t('btn_new.Deliveries')}
					</CreateButton>
				</>
			}
		>
			<Section>
				<div>...Deliveries...</div>
				<div>table</div>
				<div>detail</div>
				<div>confirm</div>
			</Section>
		</Layout.Default>
	);
};

export default DeliveriesPage;
