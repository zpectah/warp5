import React from 'react';
import styled from 'styled-components';

import media from '../../../styles/responsive';

const Wrapper = styled.div<{ justify: FormRowProps['justify'] }>`
	width: 100%;
	padding-bottom: 0.5rem;
	display: flex;
	flex-direction: column;
	align-items: center;

	& + .form-row {
		margin-top: 0.5rem;
	}

	${(props) =>
		props.justify &&
		`
		justify-content: ${props.justify};
	`}

	${media.min.md} {
		flex-direction: row;
	}
`;
const LabelWrapper = styled.label`
	width: 100%;
	padding-bottom: 0.5rem;

	b {
		padding-left: 0.5rem;
	}

	${media.min.md} {
		width: 200px;
		padding-bottom: 0;
	}
`;
const InputWrapper = styled.div`
	width: 100%;
	flex: 1;
`;

interface FormRowProps {
	justify?:
		| 'center'
		| 'space-around'
		| 'space-between'
		| 'flex-start'
		| 'flex-end';
	id?: string;
	label?: string;
	required?: boolean;
}

const FormRow: React.FC<FormRowProps> = ({
	children,
	justify = 'flex-start',
	id,
	label,
	required = false,
}) => {
	return (
		<Wrapper className="form-row" justify={justify}>
			{label && (
				<LabelWrapper
					className="form-row-column form-row-column-label"
					htmlFor={id}
				>
					{label}
					{required && <b>*</b>}
				</LabelWrapper>
			)}
			<InputWrapper className="form-row-column form-row-column-input">
				{children}
			</InputWrapper>
		</Wrapper>
	);
};

export default FormRow;
