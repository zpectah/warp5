import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { ROUTE_PATH_SUFFIX_DETAIL, ROUTES } from '../../constants';
import Layout from '../../components/Layout';
import useUiToasts from '../../hooks/useUiToasts';
import { Section, CreateButton, Dialog } from '../../components/ui';
import DataTable from '../../components/Table';
import DetailDialog from '../../components/Detail';
import { useCategories } from '../../hooks/App';

const CategoriesPage = () => {
	const params: any = useParams();
	const history: any = useHistory();
	const { t } = useTranslation(['common', 'page', 'message']);
	const { Categories, isCategoriesLoading } = useCategories();
	const [loading, setLoading] = useState<boolean>(false);
	const [processing, setProcessing] = useState<boolean>(false);
	const [detailOpen, setDetailOpen] = useState<boolean>(false);
	const [detailData, setDetailData] = useState<any>(null);
	const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
	const [confirmData, setConfirmData] = useState([]);
	const [selectedRows, setSelectedRows] = useState<any[]>([]);
	const dispatch = useDispatch();
	const { createToasts } = useUiToasts(dispatch);

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

		if (!data)
			createToasts({
				title: t('message:error.itemNotFound'),
				context: 'error',
				timeout: 3500,
			});

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
		history.push(ROUTES.app.categories.path);
	};

	const onToggle = (ids: number[]) => {
		setProcessing(true);
		// TODO: toggle handler
		console.log('TOGGLE this items', ids);

		// callback
		setProcessing(false);
	};

	const onDeleteConfirm = (ids: number[]) => {
		let master = [...ids];

		setProcessing(true);
		setConfirmOpen(true);
		setConfirmData([]);
		setSelectedRows([]);

		// TODO: delete handler
		console.log('DELETE this items ', master);

		// callback
		setProcessing(false);
		onDetailClose();
	};

	const onDataSubmit = (data: any) => {
		setProcessing(true);
		// TODO: submit handler
		if (data.id == 'new') {
			console.log('CREATE data', data);
		} else {
			console.log('UPDATE data', data);
		}

		// callback
		setProcessing(false);
		onDetailClose();
	};

	useEffect(() => {
		if (params.id && Categories) {
			setDetailOpen(true);
			setDetailData(getDetailData(params.id, Categories));
		}
	}, [params.id, Categories]);

	useEffect(() => {
		setLoading(isCategoriesLoading);
	}, [isCategoriesLoading]);

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
					onDelete={onDelete}
					onSubmit={onDataSubmit}
					onCancel={onDetailClose}
					processing={processing}
					loading={loading}
					allowDelete={true}
				/>
				<Dialog.Confirm
					open={confirmOpen}
					onToggle={(open) => setConfirmOpen(open)}
					onConfirm={onDeleteConfirm}
					onCancel={() => {
						setConfirmData([]);
						setConfirmOpen(false);
					}}
					title={t('title:deleteConfirm')}
					items={confirmData}
				/>
			</Section>
		</Layout.Default>
	);
};

export default CategoriesPage;
