import React, { useEffect, useState } from 'react';

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
	onDelete?: (ids: number[]) => void;
	onSubmit?: (data: any) => void;
	onCancel?: () => void;
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
	allowDelete?: boolean;
	processing?: boolean;
	loading?: boolean;
}

const DetailDialog = ({
	model,
	open,
	onToggle,
	detailData,
	onDelete,
	onSubmit,
	onCancel,
	size = 'md',
	allowDelete,
	processing,
	loading,
}: DetailDialogProps) => {
	const [isOpen, setOpen] = useState(open);

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
				onClose={onCancel}
			>
				<ComponentName
					detailData={detailData}
					onCancel={onCancel}
					onSubmit={onSubmit}
					onDelete={onDelete}
					allowDelete={allowDelete}
					processing={processing}
					loading={loading}
				/>
			</Dialog.Blank>
		</>
	);
};

export default DetailDialog;
