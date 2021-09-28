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
	onUpdate?: () => void;
	showOrphans?: boolean;
}

const MenuItemsManager: React.FC<MenuItemsManagerProps> = ({
	menuId,
	showOrphans,
}) => {
	const { t } = useTranslation(['common', 'message', 'component', 'types']);
	const { MenuItems, toggleMenuItems, deleteMenuItems, reloadMenuItems } =
		useMenuItems();
	const [dialogOpen, setDialogOpen] = useState(false);
	const [detailOpen, setDetailOpen] = useState(false);
	const [listItems, setListItems] = useState([]);
	const [listOrphans, setListOrphans] = useState([]);
	const [detailData, setDetailData] = useState<any>({ id: 'new' });

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

	const itemSelectHandler = (item) => {
		// TODO: open dialog and set data

		console.log('itemSelectHandler', item);

		setDetailData(item);
		setDetailOpen(true);
	};
	const itemToggleHandler = (id) => {
		// TODO: toggle active

		console.log('itemToggleHandler', id);
	};
	const itemDeleteHandler = (id) => {
		// TODO: open confirm dialog

		console.log('itemDeleteHandler', id);
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
							{t('btn.create')}
						</Button>
						<Button onClick={() => setDialogOpen(false)}>
							{t('btn.cancel')}
						</Button>
					</DialogActionsBlock>
				</DialogActions>
			</ManagerDialog>
			<MenuItemDetail
				open={detailOpen}
				onToggle={(open) => setDetailOpen(open)}
				onSubmit={(data) => {
					console.log('onSubmit', data);
				}}
				onDelete={(id) => {
					console.log('onDelete', id);
				}}
				detailData={detailData}
			/>
		</>
	);
};

export default MenuItemsManager;
