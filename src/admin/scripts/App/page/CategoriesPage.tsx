import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import { Section, CreateButton } from '../../components/ui';
import DataTable from '../../components/Table';

const CategoriesPage = () => {
	const { t } = useTranslation(['common', 'page']);

	return (
		<Layout.Default
			route={ROUTES.app.categories}
			titlePage={t('page:Categories.page.title')}
			titleMeta={t('page:Categories.meta.title')}
			headerChildren={
				<>
					<CreateButton href={ROUTES.app.categories.path} newDetailSuffix>
						{t('btn_new.Categories')}
					</CreateButton>
				</>
			}
		>
			<Section>
				<DataTable
					data={[]}
					columnsLayout={{ name: true }}
					model={'Categories'}
					onRowDetailCallback={(id) => {
						console.log('onRowDetailCallback', id);
					}}
					onRowToggleCallback={(id) => {
						console.log('onRowToggleCallback', id);
					}}
					onRowDeleteCallback={(id) => {
						console.log('onRowDeleteCallback', id);
					}}
					onSelect={(data) => {
						console.log('onSelect', data);
					}}
				/>
				<div>detail</div>
				<div>confirm</div>
			</Section>
		</Layout.Default>
	);
};

export default CategoriesPage;
