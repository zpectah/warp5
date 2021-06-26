import React from 'react';
import { useTranslation } from 'react-i18next';

import PickerBase from './PickerBase';
import { useCategories } from '../../hooks/App';

interface CategoriesPickerProps {
	id: string;
	value: string | string[];
	onChange: (e: any) => void;
	onBlur: (e: any) => void;
	multiple?: boolean;
	ignoredId?: any[];
	mode?: 'all' | 'category' | 'gallery';
}

const CategoriesPicker = ({
	id,
	value,
	onChange,
	onBlur,
	multiple,
	ignoredId = [],
	mode = 'all',
}: CategoriesPickerProps) => {
	const { t } = useTranslation(['common', 'input', 'messages']);
	const { Categories } = useCategories();

	const placeholder = t('input:select_category.placeholder', {
		count: multiple ? 2 : 1,
	});

	const getPickerOptions = () => {
		let opts = [];

		Categories?.map((option) => {
			switch (option.type) {
				case 'default':
					if (mode == 'category' || mode == 'all')
						opts.push({
							value: option.id,
							label: option.name,
							disabled: false,
						});
					break;

				case 'gallery':
					if (mode == 'gallery' || mode == 'all')
						opts.push({
							value: option.id,
							label: option.name,
							disabled: false,
						});
					break;
			}
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

export default CategoriesPicker;
