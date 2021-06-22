import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import { Section, CreateButton } from '../../components/ui';

const PaymentsPage = () => {
	const { t } = useTranslation(['common', 'page']);

	return (
		<Layout.Default
			route={ROUTES.market.payments}
			titlePage={t('page:Payments.page.title')}
			titleMeta={t('page:Payments.meta.title')}
			headerChildren={
				<>
					<CreateButton href={ROUTES.market.payments.path} newDetailSuffix>
						{t('btn_new.Payments')}
					</CreateButton>
				</>
			}
		>
			<Section>
				<div>...Payments...</div>
				<div>table</div>
				<div>detail</div>
				<div>confirm</div>
			</Section>
		</Layout.Default>
	);
};

export default PaymentsPage;
