import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import { Section, CreateButton } from '../../components/ui';

const DistributorsPage = () => {
	const { t } = useTranslation(['common', 'page']);

	return (
		<Layout.Default
			route={ROUTES.market.distributors}
			titlePage={t('page:Distributors.page.title')}
			titleMeta={t('page:Distributors.meta.title')}
			headerChildren={
				<>
					<CreateButton href={ROUTES.market.distributors.path} newDetailSuffix>
						{t('btn_new.Distributors')}
					</CreateButton>
				</>
			}
		>
			<Section>
				<div>...Distributors...</div>
				<div>table</div>
				<div>detail</div>
				<div>confirm</div>
			</Section>
		</Layout.Default>
	);
};

export default DistributorsPage;
