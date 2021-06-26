import React from 'react';

import { Form } from '../ui';

interface PickerBaseProps {
	id: string;
	value: string | string[];
	onChange: (e: any) => void;
	onBlur: (e: any) => void;
	placeholder: string;
	multiple?: boolean;
	options: { value: string; label: string }[];
}

const PickerBase: React.FC<PickerBaseProps> = ({
	children,
	id,
	value,
	onChange,
	onBlur,
	placeholder,
	multiple,
	options,
}) => {
	return (
		<>
			<Form.Select
				id={id}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				style={{ width: '50%' }}
				multiple={multiple}
				placeholder={placeholder}
				options={options}
				children={children}
			/>
		</>
	);
};

export default PickerBase;
