import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import { Section, CreateButton } from '../../components/ui';
import DataTable from '../../components/Table';
import { useCategories } from '../../hooks/App';

const CategoriesPage = () => {
	const { t } = useTranslation(['common', 'page']);
	const { Categories } = useCategories();

	const columnsLayout = {
		title_lang: true,
		type: true,
		active: true,
	};

	const onRowDetail = (id: number) => {
		console.log('onRowDetailCallback', id);
	};

	const onToggle = (ids: number[]) => {
		console.log('onToggleCallback', ids);
	};

	const onDelete = (ids: number[]) => {
		console.log('onDeleteCallback', ids);
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
					data={Categories}
					columnsLayout={columnsLayout}
					onRowDetailCallback={onRowDetail}
					onToggleCallback={onToggle}
					onDeleteCallback={onDelete}
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
