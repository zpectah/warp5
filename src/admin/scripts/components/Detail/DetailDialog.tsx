import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Dialog } from '../ui';
import { appProps } from '../../types/types';

import CategoriesForm from './form/CategoriesForm';

interface DetailDialogProps {
	model:
		| appProps['modelApp']
		| appProps['modelMembers']
		| appProps['modelMarket'];
	open: boolean;
	onToggle: (open: boolean) => void;
	detailData: any; // TODO
	basePath: string;
	onDelete?: (ids: number[]) => void;
	onSubmit?: (data: any) => void;
	onCancel?: () => void;
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
	allowDelete?: boolean;
}

const DetailDialog = ({
	model,
	open,
	onToggle,
	detailData,
	basePath,
	onDelete,
	onSubmit,
	onCancel,
	size = 'md',
	allowDelete,
}: DetailDialogProps) => {
	const history = useHistory();
	const [isOpen, setOpen] = useState(open);

	const afterCloseHandler = () => {
		history.push(basePath);
	};

	useEffect(() => setOpen(open), [open]);
	useEffect(() => onToggle(isOpen), [isOpen]);

	const component = {
		Categories: CategoriesForm,
	};

	const ComponentName = component[model];

	return (
		<>
			<Dialog.Blank
				open={isOpen}
				onToggle={(open) => setOpen(open)}
				size={size}
				onClose={afterCloseHandler}
			>
				<ComponentName
					detailData={detailData}
					onCancel={onCancel}
					onSubmit={onSubmit}
					onDelete={onDelete}
					allowDelete={allowDelete}
				/>
			</Dialog.Blank>
		</>
	);
};

export default DetailDialog;
