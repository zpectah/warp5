import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

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
	label = 'Search',
	placeholder = 'Search',
	onChange,
	disabled = false,
}: SearchInputProps) => {
	return (
		<>
			<TextField
				type="search"
				id={id}
				label={label}
				placeholder={placeholder}
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
				disabled={disabled}
			/>
		</>
	);
};

export default SearchInput;
