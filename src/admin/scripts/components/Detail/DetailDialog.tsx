import React, { useEffect, useState } from 'react';

import { Dialog, Preloader } from '../ui';
import { appProps } from '../../types/types';
import CategoriesForm from './form/CategoriesForm';
import TagsForm from './form/TagsForm';
import TranslationsForm from './form/TranslationsForm';
import PagesForm from './form/PagesForm';
import MenuForm from './form/MenuForm';
import UsersForm from './form/UsersForm';
import MembersForm from './form/MembersForm';

interface DetailDialogProps {
	model:
		| appProps['modelApp']
		| appProps['modelMembers']
		| appProps['modelMarket'];
	open: boolean;
	onToggle: (open: boolean) => void;
	detailData: any;
	onDelete?: (ids: number[]) => void;
	onSubmit?: (data: any) => void;
	onCancel?: () => void;
	size?: 'sm' | 'md' | 'lg' | 'xl';
	allowDelete?: boolean;
	processing?: boolean;
	loading?: boolean;
	languageContent?: boolean;
	authorId: number;
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
	languageContent,
	authorId,
}: DetailDialogProps) => {
	const [isOpen, setOpen] = useState(open);

	useEffect(() => setOpen(open), [open]);
	useEffect(() => onToggle(isOpen), [isOpen]);

	const component = {
		Tags: TagsForm,
		Users: UsersForm,
		Posts: CategoriesForm, // TODO
		Translations: TranslationsForm,
		Categories: CategoriesForm,
		Pages: PagesForm,
		Uploads: CategoriesForm, // TODO
		Menu: MenuForm,
		Messages: CategoriesForm, // TODO
		Requests: CategoriesForm, // TODO
		Members: MembersForm,
		Products: CategoriesForm, // TODO
		Deliveries: CategoriesForm, // TODO
		Distributors: CategoriesForm, // TODO
		Payments: CategoriesForm, // TODO
		Producers: CategoriesForm, // TODO
		Stores: CategoriesForm, // TODO
		ProductsOptions: CategoriesForm, // TODO
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
				{processing && (
					<>
						<Preloader.Page />
					</>
				)}
				{detailData ? (
					<ComponentName
						detailData={detailData}
						onCancel={onCancel}
						onSubmit={onSubmit}
						onDelete={onDelete}
						allowDelete={allowDelete}
						processing={processing}
						loading={loading}
						languageContent={languageContent}
						authorId={authorId}
					/>
				) : (
					<>
						<Preloader.Page />
					</>
				)}
			</Dialog.Blank>
		</>
	);
};

export default DetailDialog;
