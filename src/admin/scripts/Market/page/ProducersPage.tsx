import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import { Section, CreateButton } from '../../components/ui';

const ProducersPage = () => {
	const { t } = useTranslation(['common', 'page']);

	return (
		<Layout.Default
			route={ROUTES.market.producers}
			titlePage={t('page:Producers.page.title')}
			titleMeta={t('page:Producers.meta.title')}
			headerChildren={
				<>
					<CreateButton href={ROUTES.market.producers.path} newDetailSuffix>
						{t('btn_new.Producers')}
					</CreateButton>
				</>
			}
		>
			<Section>
				<div>...Producers...</div>
				<div>table</div>
				<div>detail</div>
				<div>confirm</div>
			</Section>
		</Layout.Default>
	);
};

export default ProducersPage;
