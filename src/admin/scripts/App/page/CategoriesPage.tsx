import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useHistory } from 'react-router-dom';

import { ROUTE_PATH_SUFFIX_DETAIL, ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import { Section, CreateButton, Dialog } from '../../components/ui';
import DataTable from '../../components/Table';
import DetailDialog from '../../components/Detail';
import { useCategories } from '../../hooks/App';

const CategoriesPage = () => {
	const params: any = useParams();
	const history: any = useHistory();
	const { t } = useTranslation(['common', 'page']);
	const { Categories } = useCategories();
	const [detailOpen, setDetailOpen] = useState<boolean>(false);
	const [detailData, setDetailData] = useState<any>(null);
	const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
	const [confirmData, setConfirmData] = useState([]);
	const [selectedRows, setSelectedRows] = useState<any[]>([]);

	const columnsLayout = {
		title_lang: true,
		type: true,
		active: true,
	};

	const getDetailData = (id, items) => {
		let data = null;

		if (id == 'new') {
			data = {
				id: 'new',
			};
		} else if (items) {
			items.map((item) => {
				if (item.id == id) data = item;
			});
		}

		if (!data) console.warn('This item was not found ...'); // TODO: toast or message

		return data;
	};

	const onRowDetail = (id: number) => {
		history.push(
			`${ROUTES.app.categories.path}${ROUTE_PATH_SUFFIX_DETAIL}/${id}`,
		);
	};

	const onDelete = (ids: number[]) => {
		setConfirmOpen(true);
		setConfirmData(ids);
	};

	const onSelect = (ids: number[]) => {
		setSelectedRows(ids);
	};

	const onDetailClose = () => {
		setDetailOpen(false);
		setDetailData(null);
	};

	const onToggle = (ids: number[]) => {
		// TODO: toggle handler
		console.log('onToggleCallback', ids);
	};

	const onDeleteConfirm = (ids: number[]) => {
		let master = [...ids];
		setConfirmOpen(true);
		setConfirmData([]);
		setSelectedRows([]);

		// TODO: delete handler
		console.log('Delete this items ', master);
	};

	const onDataSubmit = (data: any) => {
		// TODO: submit handler
		console.log('On submit data', data);
	};

	useEffect(() => {
		if (params.id && Categories) {
			setDetailOpen(true);
			setDetailData(getDetailData(params.id, Categories));
		}
	}, [params.id, Categories]);

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
					languageContent
					model={'Categories'}
					data={Categories}
					selectedRows={selectedRows}
					columnsLayout={columnsLayout}
					onRowDetailCallback={onRowDetail}
					onToggleCallback={onToggle}
					onDeleteCallback={onDelete}
					onSelect={onSelect}
					allowSelect={true}
					allowDetail={true}
				/>
				<DetailDialog
					model={'Categories'}
					detailData={detailData}
					open={detailOpen}
					onToggle={(open) => setDetailOpen(open)}
					basePath={ROUTES.app.categories.path}
					onDelete={onDelete}
					onSubmit={onDataSubmit}
					onCancel={onDetailClose}
					allowDelete={true}
				/>
				<Dialog.Confirm
					open={confirmOpen}
					onToggle={(open) => setConfirmOpen(open)}
					onConfirm={onDeleteConfirm}
					onCancel={() => {
						setConfirmOpen(false);
					}}
					title="Are you sure want to delete?"
					items={confirmData}
				/>
			</Section>
		</Layout.Default>
	);
};

export default CategoriesPage;
