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
import { useTags, useProfile } from '../../hooks/App';

const TagsPage = () => {
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
		Tags,
		isTagsLoading,
		updateTags,
		toggleTags,
		deleteTags,
		createTags,
		reloadTags,
	} = useTags();
	const { Profile } = useProfile();
	const { createToasts } = useUiToasts(dispatch);

	// Static variables
	const modelName = 'Tags';
	const modelRoute = ROUTES.app.tags;
	const columnsLayout = {
		name: true,
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

		toggleTags(ids).then((response) => {
			// console.log('toggleTags', response);

			createToasts({
				title: t('messages:success.items.update', { count: ids.length }),
				context: 'success',
				timeout: MESSAGE_SUCCESS_DURATION,
			});
			reloadTags();

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

		deleteTags(master).then((response) => {
			// console.log('deleteTags', response);

			onDetailClose();
			createToasts({
				title: t('messages:success.items.delete', { count: ids.length }),
				context: 'success',
				timeout: MESSAGE_SUCCESS_DURATION,
			});
			reloadTags();

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
			createTags(master).then((response) => {
				// console.log('createTags', response);

				onDetailClose();
				createToasts({
					title: t('messages:success.items.create'),
					context: 'success',
					timeout: MESSAGE_SUCCESS_DURATION,
				});
				reloadTags();

				setProcessing(false);
			});
		} else {
			updateTags(master).then((response) => {
				// console.log('updateTags', response);

				onDetailClose();
				createToasts({
					title: t('messages:success.items.update'),
					context: 'success',
					timeout: MESSAGE_SUCCESS_DURATION,
				});
				reloadTags();

				setProcessing(false);
			});
		}
	};

	// Trigger detail dialog when url detail parameter
	useEffect(() => {
		if (params.id && Tags) {
			setDetailOpen(true);
			setDetailData(getDetailData(params.id, Tags));
		}
	}, [params.id, Tags]);

	// Trigger loading status
	useEffect(() => {
		setLoading(isTagsLoading);
	}, [isTagsLoading]);

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
					data={Tags}
					searchAttrs={['name']}
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

export default TagsPage;
