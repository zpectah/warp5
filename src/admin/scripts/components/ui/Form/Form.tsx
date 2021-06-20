import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.form`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

interface FormProps {
	name?: string;
}

const Form: React.FC<FormProps> = ({ children, name = 'form' }) => {
	return (
		<Wrapper className="form" name={name} noValidate autoComplete="off">
			{children}
		</Wrapper>
	);
};

export default Form;
