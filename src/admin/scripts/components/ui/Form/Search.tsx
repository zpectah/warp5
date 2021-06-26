import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { useTranslation } from 'react-i18next';

interface SearchInputProps {
	id: string;
	label?: string;
	placeholder?: string;
	value: string;
	onChange: (event: any) => void;
	disabled?: boolean;
}

const SearchInput = ({
	id,
	label,
	placeholder,
	onChange,
	disabled = false,
}: SearchInputProps) => {
	const { t } = useTranslation(['cinput']);

	return (
		<>
			<TextField
				type="search"
				id={id}
				label={label}
				placeholder={
					placeholder ? placeholder : t('input:searchTable.placeholder')
				}
				variant="outlined"
				onChange={onChange}
				size="small"
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<SearchIcon fontSize="small" />
						</InputAdornment>
					),
				}}
				margin="dense"
				disabled={disabled}
			/>
		</>
	);
};

export default SearchInput;
