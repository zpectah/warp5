import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import { Section, CreateButton } from '../../components/ui';

const UsersPage = () => {
	const { t } = useTranslation(['common', 'page']);

	return (
		<Layout.Default
			route={ROUTES.app.users}
			titlePage={t('page:Users.page.title')}
			titleMeta={t('page:Users.meta.title')}
			headerChildren={
				<>
					<CreateButton href={ROUTES.app.users.path} newDetailSuffix>
						{t('btn_new.Users')}
					</CreateButton>
				</>
			}
		>
			<Section>
				<div>...Users...</div>
				<div>table</div>
				<div>detail</div>
				<div>confirm</div>
			</Section>
		</Layout.Default>
	);
};

export default UsersPage;
