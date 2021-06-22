import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import { Section, CreateButton } from '../../components/ui';
import DataTable from '../../components/Table';

const CategoriesPage = () => {
	const { t } = useTranslation(['common', 'page']);

	const columnsLayout = {
		name: true,
		calories: true,
		fat: true,
		carbs: true,
		protein: true,
	};

	const onRowDetail = (id: number) => {
		console.log('onRowDetailCallback', id);
	};

	const onRowToggle = (id: number) => {
		console.log('onRowToggleCallback', id);
	};

	const onRowDelete = (id: number) => {
		console.log('onRowDeleteCallback', id);
	};

	const onSelect = (ids: number[]) => {
		console.log('onSelect', ids);
	};

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
					model={'Categories'}
					data={[]}
					columnsLayout={columnsLayout}
					onRowDetailCallback={onRowDetail}
					onRowToggleCallback={onRowToggle}
					onRowDeleteCallback={onRowDelete}
					onSelect={onSelect}
					allowSelect={true}
					allowDetail={true}
				/>
				<div>detail</div>
				<div>confirm</div>
			</Section>
		</Layout.Default>
	);
};

export default CategoriesPage;
