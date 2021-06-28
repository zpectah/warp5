import { commonModelProps } from './types';
import config from '../config';

export interface ProductsItemProps extends commonModelProps {
	name: string;
	type: keyof config.OPTIONS.model.Products.type_list;
	category?: string[];
	tags?: string[];
	item_price: number;
	item_discount: number;
	item_amount: number;
	item_weight: number;
	item_length: number;
	item_width: number;
	item_height: number;
	item_new: number;
	item_used: number;
	item_unboxed: number;
	products_options: string[];
	items_related: string[];
	attachments?: string[];
	img_main?: string;
	img_thumbnail?: string;
	rating?: number;
	lang?: {
		title: string;
		description?: string;
		content: string;
	};
}

export interface StoresItemProps extends commonModelProps {
	name: string;
	type: keyof config.OPTIONS.model.Stores.type_list;
	store_address: string;
	store_city: string;
	store_country: string;
	store_zip: string;
	store_location: any[];
	store_email: string[];
	store_phone: string[];
	img_main?: string;
	img_thumbnail?: string;
	rating?: number;
	lang?: {
		title: string;
		description?: string;
	};
}

export interface PaymentsItemProps extends commonModelProps {
	name: string;
	type: keyof config.OPTIONS.model.Payments.type_list;
	item_price: number;
	item_weight_limit: number;
	img_main?: string;
	lang?: {
		title: string;
		description?: string;
	};
}

export interface DeliveriesItemProps extends commonModelProps {
	name: string;
	type: keyof config.OPTIONS.model.Deliveries.type_list;
	item_price: number;
	item_weight_limit: number;
	img_main?: string;
	lang?: {
		title: string;
		description?: string;
	};
}

export interface ProductsOptionsItemProps extends commonModelProps {
	name: string;
	type: keyof config.OPTIONS.model.ProductsOptions.type_list;
	value: string;
	lang?: {
		title: string;
		description?: string;
	};
}

export interface ProducersItemProps extends commonModelProps {
	name: string;
	type: keyof config.OPTIONS.model.Producers.type_list;
	img_main?: string;
}

export interface DistributorsItemProps extends commonModelProps {
	name: string;
	type: keyof config.OPTIONS.model.Distributors.type_list;
	img_main?: string;
}

export interface OrdersItemProps extends commonModelProps {
	name: string;
	type: 'default';
}

export interface BasketsItemProps extends commonModelProps {
	name: string;
	type: 'default';
}
