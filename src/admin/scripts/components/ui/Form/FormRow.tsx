import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<{ justify: FormRowProps['justify'] }>`
	width: 100%;
	display: flex;

	& + .form-row {
		margin-top: 1rem;
	}

	${(props) =>
		props.justify &&
		`
		justify-content: ${props.justify};
	`}
`;

interface FormRowProps {
	justify?:
		| 'center'
		| 'space-around'
		| 'space-between'
		| 'flex-start'
		| 'flex-end';
}

const FormRow: React.FC<FormRowProps> = ({ children, justify = 'center' }) => {
	return (
		<Wrapper className="form-row" justify={justify}>
			{children}
		</Wrapper>
	);
};

export default FormRow;
