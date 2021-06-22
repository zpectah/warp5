import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import { Section, CreateButton } from '../../components/ui';

const MembersPage = () => {
	const { t } = useTranslation(['common', 'page']);

	return (
		<Layout.Default
			route={ROUTES.members.members}
			titlePage={t('page:Members.page.title')}
			titleMeta={t('page:Members.meta.title')}
			headerChildren={
				<>
					<CreateButton href={ROUTES.members.members.path} newDetailSuffix>
						{t('btn_new.Members')}
					</CreateButton>
				</>
			}
		>
			<Section>
				<div>...Members...</div>
				<div>table</div>
				<div>detail</div>
				<div>confirm</div>
			</Section>
		</Layout.Default>
	);
};

export default MembersPage;
