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
import MessagesForm from './form/MessagesForm';
import RequestsForm from './form/RequestsForm';
import OrdersForm from './form/OrdersForm';
import BasketsForm from './form/BasketsForm';
import PostsForm from './form/PostsForm';
import DeliveriesForm from './form/DeliveriesForm';
import PaymentsForm from './form/PaymentsForm';
import DistributorsForm from './form/DistributorsForm';
import ProducersForm from './form/ProducersForm';
import ProductsOptionsForm from './form/ProductsOptionsForm';
import StoresForm from './form/StoresForm';
import ProductsForm from './form/ProductsForm';

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
		Posts: PostsForm,
		Translations: TranslationsForm,
		Categories: CategoriesForm,
		Pages: PagesForm,
		Uploads: CategoriesForm, // TODO
		Menu: MenuForm,
		Messages: MessagesForm,
		Requests: RequestsForm,
		Members: MembersForm,
		Products: ProductsForm,
		Deliveries: DeliveriesForm,
		Distributors: DistributorsForm,
		Payments: PaymentsForm,
		Producers: ProducersForm,
		Stores: StoresForm,
		ProductsOptions: ProductsOptionsForm,
		Orders: OrdersForm,
		Baskets: BasketsForm,
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
					<Preloader.Block />
				)}
			</Dialog.Blank>
			{processing && <Preloader.Page />}
		</>
	);
};

export default DetailDialog;
