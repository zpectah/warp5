import React from 'react';
import { useTranslation } from 'react-i18next';

import PickerBase from './PickerBase';
import { useProducts } from '../../hooks/Market';

interface ProductsPickerProps {
	id: string;
	value: string | string[];
	onChange: (e: any) => void;
	onBlur: (e: any) => void;
	multiple?: boolean;
	ignoredId?: any[];
}

const ProductsPicker = ({
	id,
	value,
	onChange,
	onBlur,
	multiple,
	ignoredId = [],
}: ProductsPickerProps) => {
	const { t } = useTranslation(['common', 'input', 'messages']);
	const { Products } = useProducts();

	const placeholder = t('input:select_products.placeholder', {
		count: multiple ? 2 : 1,
	});

	const getPickerOptions = () => {
		let opts = [];

		Products?.map((option) => {
			opts.push({
				value: option.id,
				label: option.name,
				disabled: false,
			});
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

export default ProductsPicker;
