import React from 'react';
import { useTranslation } from 'react-i18next';

import PickerBase from './PickerBase';
import { usePages } from '../../hooks/App';

interface PagesPickerProps {
	id: string;
	value: string | string[];
	onChange: (e: any) => void;
	onBlur: (e: any) => void;
	multiple?: boolean;
	ignoredId?: any[];
}

const PagesPicker = ({
	id,
	value,
	onChange,
	onBlur,
	multiple,
	ignoredId = [],
}: PagesPickerProps) => {
	const { t } = useTranslation(['common', 'input', 'messages']);
	const { Pages } = usePages();

	const placeholder = t('input:select_Pages.placeholder', {
		count: multiple ? 2 : 1,
	});

	const getPickerOptions = () => {
		let opts = [];

		Pages?.map((option) => {
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

export default PagesPicker;
