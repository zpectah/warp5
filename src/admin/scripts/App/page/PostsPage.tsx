import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import { Section, CreateButton } from '../../components/ui';

const PostsPage = () => {
	const { t } = useTranslation(['common', 'page']);

	return (
		<Layout.Default
			route={ROUTES.app.posts}
			titlePage={t('page:Posts.page.title')}
			titleMeta={t('page:Posts.meta.title')}
			headerChildren={
				<>
					<CreateButton href={ROUTES.app.posts.path} newDetailSuffix>
						{t('btn_new.Posts')}
					</CreateButton>
				</>
			}
		>
			<Section>
				<div>...Posts...</div>
				<div>table</div>
				<div>detail</div>
				<div>confirm</div>
			</Section>
		</Layout.Default>
	);
};

export default PostsPage;
