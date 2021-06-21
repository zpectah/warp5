import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import { Section } from '../../components/ui';
import CreateButton from '../../components/ui/Button/CreateButton';

const PaymentsPage = () => {
	const { t } = useTranslation('page');

	return (
		<Layout.Default
			route={ROUTES.market.payments}
			titlePage={t('page:Payments.page.title')}
			titleMeta={t('page:Payments.meta.title')}
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
				<div>...Payments...</div>
				<div>table</div>
				<div>detail</div>
				<div>confirm</div>
			</Section>
		</Layout.Default>
	);
};

export default PaymentsPage;
