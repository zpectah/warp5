import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Chip from '@material-ui/core/Chip';
import AddIcon from '@material-ui/icons/Add';

import { useMenuItems } from '../../../hooks/App';
import ManagerDialog from '../ManagerDialog';
import MenuItem from './MenuItem';
import MenuItemDetail from './MenuItemDetail';
import { MenuItemsItemProps } from '../../../types/App';
import { Dialog, Section } from '../../../components/ui';
import { string } from '../../../../../libs/utils';
import { useDispatch } from 'react-redux';
import useUiToasts from '../../../hooks/useUiToasts';
import { MESSAGE_SUCCESS_DURATION } from '../../../constants';

const Wrapper = styled.div``;

const ListBlock = styled.div`
	padding-top: 1rem;
`;

const ItemListOuter = styled.div``;
const ItemList = styled.ul`
	margin: 0;
	padding: 1rem 0 0 0;
	list-style: none;
`;

const TriggerBlock = styled.div``;

const DialogActionsBlock = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
`;

interface MenuItemsManagerProps {
	menuId: number | string;
	showOrphans?: boolean;
}

const MenuItemsManager: React.FC<MenuItemsManagerProps> = ({
	menuId,
	showOrphans,
}) => {
	const { t } = useTranslation(['common', 'message', 'component', 'types']);
	const {
		MenuItems,
		toggleMenuItems,
		deleteMenuItems,
		reloadMenuItems,
		createMenuItems,
		updateMenuItems,
	} = useMenuItems();
	const [dialogOpen, setDialogOpen] = useState(false);
	const [detailOpen, setDetailOpen] = useState(false);
	const [listItems, setListItems] = useState([]);
	const [listOrphans, setListOrphans] = useState([]);
	const [detailData, setDetailData] = useState<MenuItemsItemProps | null>(null);
	const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
	const [confirmData, setConfirmData] = useState([]);
	const [processing, setProcessing] = useState<boolean>(false);
	const dispatch = useDispatch();
	const { createToasts } = useUiToasts(dispatch);

	const getItemChildren = (id: number | string) => {
		let a = [];
		MenuItems.map((item) => {
			if (item.parent == id) a.push(item);
		});
		return a;
	};

	const setItemsList = () => {
		let a = [];
		let b = [];

		MenuItems.map((menuItem) => {
			if (
				menuItem.menu == menuId &&
				(!menuItem.parent || menuItem.parent == '')
			)
				a.push(menuItem);
			if (showOrphans && menuItem.menu == '') b.push(menuItem);
		});

		setListItems(a);
		if (showOrphans) setListOrphans(b);
	};

	const itemSelectHandler = (item: any) => {
		setDetailData(item);
		setDetailOpen(true);
	};
	const itemDeleteHandler = (id: number | string) => {
		setConfirmData([id]);
		setConfirmOpen(true);
	};
	const itemToggleHandler = (id: number | string) => {
		// console.log('itemToggleHandler', [id]);

		let master = [id];

		setProcessing(true);

		toggleMenuItems(master).then((response) => {
			// console.log('toggleMenuItems', response);

			reloadMenuItems();
			createToasts({
				title: t('messages:success.items.update', { count: 1 }),
				context: 'success',
				timeout: MESSAGE_SUCCESS_DURATION,
			});

			setProcessing(false);
		});
	};
	const itemSubmitHandler = (data: MenuItemsItemProps) => {
		// console.log('onSubmit detail', data);

		const master = {
			...data,
			name: string.replaceSpaces(data.name),
			menu: menuId,
		};

		setProcessing(true);

		console.log('master', master);

		if (data.id == 'new') {
			// create
			createMenuItems(master).then((response) => {
				// console.log('createMenuItems', response);

				reloadMenuItems();
				createToasts({
					title: t('messages:success.items.create', { count: 1 }),
					context: 'success',
					timeout: MESSAGE_SUCCESS_DURATION,
				});

				setProcessing(false);
				setDetailData(null);
				setDetailOpen(false);
			});
		} else {
			// update
			updateMenuItems(master).then((response) => {
				// console.log('updateMenuItems', response);

				reloadMenuItems();
				createToasts({
					title: t('messages:success.items.update', { count: 1 }),
					context: 'success',
					timeout: MESSAGE_SUCCESS_DURATION,
				});

				setProcessing(false);
				setDetailData(null);
				setDetailOpen(false);
			});
		}
	};
	const onDeleteConfirm = (ids: number[]) => {
		// console.log('onDeleteConfirm', ids);

		let master = [...ids];

		setProcessing(true);

		deleteMenuItems(master).then((response) => {
			reloadMenuItems();
			createToasts({
				title: t('messages:success.items.delete', { count: 1 }),
				context: 'success',
				timeout: MESSAGE_SUCCESS_DURATION,
			});

			setProcessing(false);
			setConfirmData([]);
			setConfirmOpen(false);
			setDetailData(null);
			setDetailOpen(false);
		});
	};

	const renderMenuItem = (item, children) => (
		<MenuItem
			key={item.id}
			item={item}
			onSelect={itemSelectHandler}
			onToggle={itemToggleHandler}
			onDelete={itemDeleteHandler}
			children={children}
		/>
	);

	const renderMenuList = (itemsList: any[]) => {
		itemsList.sort(function (a, b) {
			let valA = a.item_order;
			let valB = b.item_order;

			if (valA < valB) return -1;
			if (valA > valB) return 1;
			return 0;
		});

		return itemsList.map((item) =>
			renderMenuItem(item, renderMenuList(getItemChildren(item.id))),
		);
	};

	useEffect(() => {
		if (MenuItems) setItemsList();
	}, [MenuItems]);

	return (
		<>
			<Wrapper>
				<TriggerBlock>
					<Button
						onClick={() => setDialogOpen(true)}
						color="primary"
						variant="contained"
					>
						Items manager
					</Button>
				</TriggerBlock>
				<ListBlock>
					<div>
						{listItems.map((item) => (
							<Chip key={item.id} label={item.name} size="small" />
						))}
					</div>
				</ListBlock>
			</Wrapper>
			<ManagerDialog
				open={dialogOpen}
				onToggle={(open) => setDialogOpen(open)}
				onCancel={() => setDialogOpen(false)}
			>
				<DialogTitle>Menu Items Manager</DialogTitle>
				<DialogContent dividers>
					<ItemListOuter>
						<ItemList>{renderMenuList(listItems)}</ItemList>
						<ItemList>{renderMenuList(listOrphans)}</ItemList>
					</ItemListOuter>
				</DialogContent>
				<DialogActions>
					<DialogActionsBlock>
						<Button
							onClick={() => itemSelectHandler({ id: 'new' })}
							color="primary"
							variant="contained"
							startIcon={<AddIcon fontSize="small" />}
						>
							{t('btn.createNew')}
						</Button>
						<Button onClick={() => setDialogOpen(false)}>
							{t('btn.cancel')}
						</Button>
					</DialogActionsBlock>
				</DialogActions>
			</ManagerDialog>
			{detailData && (
				<>
					<MenuItemDetail
						open={detailOpen}
						onToggle={(open) => setDetailOpen(open)}
						onSubmit={(data) => itemSubmitHandler(data)}
						onDelete={(id) => itemDeleteHandler(id)}
						detailData={detailData}
						onClose={() => setDetailData(null)}
						menuId={menuId}
					/>
				</>
			)}
			<Dialog.Confirm
				open={confirmOpen}
				onToggle={(open) => setConfirmOpen(open)}
				onConfirm={onDeleteConfirm}
				onCancel={() => {
					setConfirmData([]);
					setConfirmOpen(false);
				}}
				title={t('title.deleteConfirm', { count: 1 })}
				items={confirmData}
			/>
		</>
	);
};

export default MenuItemsManager;
