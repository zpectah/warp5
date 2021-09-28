import React, { useEffect, useState } from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';

import { Dialog } from '../../ui';
import { MenuItemsItemProps } from '../../../types/App';

interface MenuItemDetailProps {
	open: boolean;
	onToggle: (open: boolean) => void;
	onDelete?: (id: number | string) => void;
	onSubmit?: (data: any) => void;
	detailData: MenuItemsItemProps;
}

const MenuItemDetail: React.FC<MenuItemDetailProps> = ({
	open,
	onToggle,
	detailData,
	onDelete,
	onSubmit,
}) => {
	const { t } = useTranslation(['common', 'message', 'component', 'types']);
	const [isOpen, setOpen] = useState(open);

	useEffect(() => setOpen(open), [open]);
	useEffect(() => onToggle(isOpen), [isOpen]);

	return (
		<>
			<Dialog.Blank
				open={isOpen}
				onToggle={(open) => setOpen(open)}
				size={'md'}
				onClose={() => setOpen(false)}
			>
				<DialogTitle>
					{detailData.id == 'new' ? t('btn_new.MenuItems') : detailData.name}
				</DialogTitle>
				<DialogContent dividers>
					... MenuItemDetail dialog ... {JSON.stringify(detailData)}
				</DialogContent>
				<DialogActions>
					<Button onClick={() => onToggle(false)}>{t('btn.cancel')}</Button>
					{detailData.id !== 'new' && (
						<Button onClick={() => onDelete(detailData.id)} color="secondary">
							{t('btn.delete')}
						</Button>
					)}
					<Button onClick={() => onSubmit(detailData)} color="primary">
						{detailData.id == 'new' ? t('btn.create') : t('btn.update')}
					</Button>
				</DialogActions>
			</Dialog.Blank>
		</>
	);
};

export default MenuItemDetail;
