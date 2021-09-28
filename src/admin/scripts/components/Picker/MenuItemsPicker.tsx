import React from 'react';
import { useTranslation } from 'react-i18next';

import PickerBase from './PickerBase';
import { useMenuItems } from '../../hooks/App';
import { string } from '../../../../libs/utils';

interface MenuItemsPickerProps {
	id: string;
	value: string | string[];
	onChange: (e: any) => void;
	onBlur: (e: any) => void;
	multiple?: boolean;
	ignoredId?: any[];
	menuId: number | string;
}

const MenuItemsPicker = ({
	id,
	value,
	onChange,
	onBlur,
	multiple,
	ignoredId = [],
	menuId,
}: MenuItemsPickerProps) => {
	const { t } = useTranslation(['common', 'input', 'messages']);
	const { MenuItems } = useMenuItems();

	const placeholder = t('input:select_menuItems.placeholder', {
		count: multiple ? 2 : 1,
	});

	const getPickerOptions = () => {
		let opts = [];

		MenuItems?.map((option) => {
			let ni = null;
			if (menuId) {
				if (menuId == option.menu)
					ni = {
						value: option.id,
						label: option.name,
						disabled: false,
					};
			} else {
				ni = {
					value: option.id,
					label: option.name,
					disabled: false,
				};
			}

			if (ni) opts.push(ni);
		});

		if (ignoredId.length > 0) {
			let fo = [];

			opts.map((oi) => {
				ignoredId.map((ignoredId) => {
					if (oi.value !== ignoredId) fo.push(oi);
				});
			});

			opts = fo;
		}

		return opts;
	};

	return (
		<PickerBase
			id={id}
			value={value}
			onChange={onChange}
			onBlur={onBlur}
			options={getPickerOptions()}
			multiple={multiple}
			placeholder={placeholder}
		/>
	);
};

export default MenuItemsPicker;
