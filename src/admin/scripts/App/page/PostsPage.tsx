import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import { Section } from '../../components/ui';

const PostsPage = () => {
	const { t } = useTranslation('page');

	return (
		<Layout.Default
			route={ROUTES.app.posts}
			titlePage={t('page:Posts.page.title')}
			titleMeta={t('page:Posts.meta.title')}
		>
			<Section>
				<div>...Posts...</div>
			</Section>
		</Layout.Default>
	);
};

export default PostsPage;
