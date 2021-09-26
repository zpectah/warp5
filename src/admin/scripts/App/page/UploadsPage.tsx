import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { string } from '../../../../libs/utils';
import {
	ROUTE_PATH_SUFFIX_DETAIL,
	ROUTES,
	MESSAGE_SUCCESS_DURATION,
	MESSAGE_ERROR_DURATION,
} from '../../constants';
import Layout from '../../components/Layout';
import useUiToasts from '../../hooks/useUiToasts';
import { Section, CreateButton, Dialog } from '../../components/ui';
import DataTable from '../../components/Table';
import DetailDialog from '../../components/Detail';
import { useUploads, useProfile } from '../../hooks/App';

const UploadsPage = () => {
	const params: any = useParams();
	const history: any = useHistory();
	const dispatch = useDispatch();
	const { t } = useTranslation(['common', 'page', 'messages']);
	const [loading, setLoading] = useState<boolean>(false);
	const [processing, setProcessing] = useState<boolean>(false);
	const [detailOpen, setDetailOpen] = useState<boolean>(false);
	const [detailData, setDetailData] = useState<any>(null);
	const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
	const [confirmData, setConfirmData] = useState([]);
	const [selectedRows, setSelectedRows] = useState<any[]>([]);
	const {
		Uploads,
		isUploadsLoading,
		updateUploads,
		toggleUploads,
		deleteUploads,
		createUploads,
		reloadUploads,
	} = useUploads();
	const { Profile } = useProfile();
	const { createToasts } = useUiToasts(dispatch);

	// Static variables
	const modelName = 'Uploads';
	const modelRoute = ROUTES.app.uploads;
	const columnsLayout = {
		file_name: true,
		file_size: true,
		file_format: true,
		active: true,
	};
	const allowDetail: boolean = true; // TODO
	const allowSelect: boolean = true; // TODO
	const authorId: number = Profile?.id;

	// Returns data to dialog
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
				title: t('messages:error.itemNotFound'),
				context: 'error',
				timeout: MESSAGE_ERROR_DURATION,
			});

		return data;
	};

	// Trigger detail parameter
	const onRowDetail = (id: number) => {
		history.push(`${modelRoute.path}${ROUTE_PATH_SUFFIX_DETAIL}/${id}`);
	};

	// When confirm dialog is open
	const onDelete = (ids: number[]) => {
		setConfirmOpen(true);
		setConfirmData(ids);
	};

	// When selected items is changed
	const onSelect = (ids: number[]) => {
		setSelectedRows(ids);
	};

	// When detail dialog is closed
	const onDetailClose = () => {
		setDetailOpen(false);
		setDetailData(null);
		history.push(modelRoute.path);
	};

	// When items are toggled
	const onToggle = (ids: number[]) => {
		setProcessing(true);

		toggleUploads(ids).then((response) => {
			// console.log('toggleUploads', response);

			createToasts({
				title: t('messages:success.items.update', { count: ids.length }),
				context: 'success',
				timeout: MESSAGE_SUCCESS_DURATION,
			});
			reloadUploads();

			setSelectedRows([]);
			setProcessing(false);
		});
	};

	// When data are confirmed
	const onDeleteConfirm = (ids: number[]) => {
		let master = [...ids];

		setProcessing(true);
		setConfirmData([]);
		setSelectedRows([]);

		deleteUploads(master).then((response) => {
			// console.log('deleteUploads', response);

			onDetailClose();
			createToasts({
				title: t('messages:success.items.delete', { count: ids.length }),
				context: 'success',
				timeout: MESSAGE_SUCCESS_DURATION,
			});
			reloadUploads();

			setConfirmOpen(false);
			setProcessing(false);
		});
	};

	// When form is submitted
	const onDataSubmit = (data: any) => {
		const master = {
			...data,
			name: string.replaceSpaces(data.name),
		};

		setProcessing(true);

		if (data.id == 'new') {
			createUploads(master).then((response) => {
				// console.log('createUploads', response);

				onDetailClose();
				createToasts({
					title: t('messages:success.items.create'),
					context: 'success',
					timeout: MESSAGE_SUCCESS_DURATION,
				});
				reloadUploads();

				setProcessing(false);
			});
		} else {
			updateUploads(master).then((response) => {
				// console.log('updateUploads', response);

				onDetailClose();
				createToasts({
					title: t('messages:success.items.update'),
					context: 'success',
					timeout: MESSAGE_SUCCESS_DURATION,
				});
				reloadUploads();

				setProcessing(false);
			});
		}
	};

	// Trigger detail dialog when url detail parameter
	useEffect(() => {
		if (params.id && Uploads) {
			setDetailOpen(true);
			setDetailData(getDetailData(params.id, Uploads));
		}
	}, [params.id, Uploads]);

	// Trigger loading status
	useEffect(() => {
		setLoading(isUploadsLoading);
	}, [isUploadsLoading]);

	return (
		<Layout.Default
			route={modelRoute}
			titlePage={t(`page:${modelName}.page.title`)}
			titleMeta={t(`page:${modelName}.meta.title`)}
			headerChildren={
				<>
					<CreateButton href={modelRoute.path} newDetailSuffix>
						{t(`btn_new.${modelName}`)}
					</CreateButton>
				</>
			}
		>
			<Section>
				<DataTable
					languageContent
					data={Uploads}
					searchAttrs={['name', 'lang.[lang].value']}
					model={modelName}
					selectedRows={selectedRows}
					columnsLayout={columnsLayout}
					onRowDetailCallback={onRowDetail}
					onToggleCallback={onToggle}
					onDeleteCallback={onDelete}
					onSelect={onSelect}
					allowSelect={allowSelect}
					allowDetail={allowDetail}
					authorId={authorId}
					processing={processing}
					loading={loading}
				/>
				<DetailDialog
					languageContent
					model={modelName}
					detailData={detailData}
					open={detailOpen}
					onToggle={(open) => setDetailOpen(open)}
					onDelete={onDelete}
					onSubmit={onDataSubmit}
					onCancel={onDetailClose}
					processing={processing}
					loading={loading}
					allowDelete={allowDetail}
					authorId={authorId}
				/>
				<Dialog.Confirm
					open={confirmOpen}
					onToggle={(open) => setConfirmOpen(open)}
					onConfirm={onDeleteConfirm}
					onCancel={() => {
						setConfirmData([]);
						setConfirmOpen(false);
					}}
					title={t('title.deleteConfirm', { count: selectedRows.length || 1 })}
					items={confirmData}
				/>
			</Section>
		</Layout.Default>
	);
};

export default UploadsPage;
