import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

interface SelectBaseProps {
	id: string;
	value: string | string[];
	onChange: (e: any) => void;
	onBlur: (e: any) => void;
	placeholder: string;
	multiple?: boolean;
	options?: { value: string; label: string }[];
	style?: any;
}

const SelectBase: React.FC<SelectBaseProps> = ({
	children,
	id,
	value,
	onChange,
	onBlur,
	placeholder,
	multiple,
	options = [],
	style = { width: '50%' },
}) => {
	return (
		<>
			<Select
				id={id}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				style={style}
				variant="outlined"
				margin="dense"
				multiple={multiple}
			>
				<MenuItem value="">
					<em>{placeholder}</em>
				</MenuItem>
				{options.map((opt) => (
					<MenuItem key={opt.value} value={opt.value}>
						{opt.label}
					</MenuItem>
				))}
				{children}
			</Select>
		</>
	);
};

export default SelectBase;
