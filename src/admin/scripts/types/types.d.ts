export interface storeProps {
	language: string;
	theme: string;
	help: string;
	sideBarOpen: boolean;
}

export interface appProps {
	app: 'App' | 'Members' | 'Market';
	modelApp:
		| 'Posts'
		| 'Users'
		| 'Tags'
		| 'Translations'
		| 'Categories'
		| 'Pages'
		| 'Requests'
		| 'Messages'
		| 'Uploads'
		| 'Menu'
		| 'MenuItems';
	modelMembers: 'Members';
	modelMarket:
		| 'Products'
		| 'ProductsOptions'
		| 'Producers'
		| 'Distributors'
		| 'Stores'
		| 'Payments'
		| 'Deliveries';
	// TODO: new model
}

export interface routeProps {
	path: string | null;
	name: string;
	label: string | null;
	auth: number;
}

export interface commonModelProps {
	is_new?: boolean;
	id: string | number;
	active: number | boolean;
	deleted?: number | boolean;
}

export interface navItemProps {
	key: number;
	label: string;
	path: string | null; // TODO
	active: boolean;
	auth: number;
}
