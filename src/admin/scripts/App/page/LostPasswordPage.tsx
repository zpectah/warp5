import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import LostPasswordForm from '../../components/LostPassword';

const LostPasswordPage = () => {
	const { t } = useTranslation('page');

	return (
		<Layout.Minimal
			route={ROUTES.app['lost-password']}
			titlePage={t('page:LostPassword.page.title')}
			titleMeta={t('page:LostPassword.meta.title')}
		>
			<LostPasswordForm />
		</Layout.Minimal>
	);
};

export default LostPasswordPage;
