import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';

import { EMAIL_REGEX } from '../../constants';

const Wrapper = styled.div`
	width: 100%;
	height: auto;
`;
const ChipList = styled.div`
	padding-bottom: 0.5rem;
`;
const ButtonRow = styled.div`
	width: 100%;
	height: auto;
	display: flex;

	& .input {
		flex: 1;
	}
	& .button {
		margin-left: 0.5rem;
		flex: 0;
	}
`;

interface TagPickerProps {
	id?: string;
	value: string[];
	onChange: (value: string[]) => void;
	rowStyle?: any;
	inputType?: 'text' | 'email' | 'tel';
	inputPlaceholder?: string;
}

const TagPicker = ({
	id,
	value,
	onChange,
	rowStyle,
	inputType = 'text',
	inputPlaceholder,
}: TagPickerProps) => {
	const [inputValue, setInputValue] = useState<string>('');
	const [selected, setSelected] = useState<string[]>([]);

	const addHandler = () => {
		let na = [...selected];
		let i = na.indexOf(inputValue);

		if (!(i > -1)) na.push(inputValue);

		setInputValue('');
		setSelected(na);
		onChange(na);
	};

	const removeHandler = (e, item) => {
		let na = [...selected];
		let i = na.indexOf(item);

		if (i > -1) na.splice(i, 1);

		setSelected(na);
		onChange(na);
	};

	useEffect(() => {
		setSelected(value);
	}, [value]);

	return (
		<Wrapper style={rowStyle}>
			{selected.length > 0 && (
				<ChipList>
					{selected.map((item) => (
						<Chip
							key={item}
							label={item}
							onDelete={(e) => removeHandler(e, item)}
						/>
					))}
				</ChipList>
			)}
			<ButtonRow>
				<TextField
					type={inputType}
					placeholder={inputPlaceholder}
					id={id}
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onBlur={(e) => setInputValue(e.target.value)}
					variant="outlined"
					size="small"
					className="input"
					// pattern={inputType == 'email' ? EMAIL_REGEX : null}
				/>
				<IconButton
					color="primary"
					className="button"
					onClick={addHandler}
					size="small"
					disabled={!inputValue || inputValue.length < 3}
				>
					<AddIcon />
				</IconButton>
			</ButtonRow>
		</Wrapper>
	);
};

export default TagPicker;
