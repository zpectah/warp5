import React from 'react';
import { useTranslation } from 'react-i18next';

import PickerBase from './PickerBase';
import { useTags } from '../../hooks/App';

interface TagsPickerProps {
	id: string;
	value: string | string[];
	onChange: (e: any) => void;
	onBlur: (e: any) => void;
	multiple?: boolean;
	ignoredId?: any[];
}

const TagsPicker = ({
	id,
	value,
	onChange,
	onBlur,
	multiple,
	ignoredId = [],
}: TagsPickerProps) => {
	const { t } = useTranslation(['common', 'input', 'messages']);
	const { Tags } = useTags();

	const placeholder = t('input:select_tags.placeholder', {
		count: multiple ? 2 : 1,
	});

	const getPickerOptions = () => {
		let opts = [];

		Tags?.map((option) => {
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

export default TagsPicker;
