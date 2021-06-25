import React, { createContext, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import styled from 'styled-components';

import { string } from '../../../../../libs/utils';
import media from '../../../styles/responsive';

const Wrapper = styled.div<{ justify: FormRowControllerProps['justify'] }>`
	width: 100%;
	padding-bottom: 0.75rem;
	display: flex;
	flex-direction: column;
	align-items: center;

	& + .form-row {
		margin-top: 1rem;
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
const HelpText = styled.div`
	width: 100%;
	height: auto;
	margin-top: 0.75rem;
	font-size: 0.85rem;
	color: rgba(90, 90, 90, 0.5);
`;
const ErrorMessage = styled.div`
	width: 100%;
	height: auto;
	margin-top: 0.75rem;
	font-size: 0.85rem;
	color: ${(props) => props.theme.color.red};
`;

interface ContextProps {
	id: string | null;
	name: string | null;
	value: any;
	onChange: Function;
	onBlur: Function;
	ref: any; // TODO
	invalid: boolean | null;
	isTouched: boolean | null;
	isDirty: boolean | null;
	label?: string;
}

const Context = createContext<ContextProps>({
	id: null,
	name: null,
	value: null,
	onChange: null,
	onBlur: null,
	ref: null,
	invalid: null,
	isTouched: null,
	isDirty: null,
	label: null,
});

interface FormRowControllerProps {
	justify?:
		| 'center'
		| 'space-around'
		| 'space-between'
		| 'flex-start'
		| 'flex-end';
	name?: string;
	control: any;
	rules?: any;
	label?: string;
	id?: string;
	defaultValue?: any;
	helpText?: string;
	required?: boolean;
	errors?: string[];
}

const FormRowController: React.FC<FormRowControllerProps> = ({
	children,
	justify = 'flex-start',
	name = null,
	control,
	rules,
	label,
	id = string.getToken(2, ''),
	defaultValue,
	helpText,
	required = false,
	errors = [],
}) => {
	useEffect(() => {
		console.log('W T F  ???');

		return () => {};
	}, []);

	return (
		<Wrapper className="form-row form-row-controller" justify={justify}>
			<Controller
				name={name}
				control={control}
				rules={rules}
				defaultValue={defaultValue}
				render={(
					{ onChange, onBlur, value, name, ref },
					{ invalid, isTouched, isDirty },
				) => (
					<>
						<Context.Provider
							value={{
								id: id,
								name: name,
								value: value,
								onChange: onChange,
								onBlur: onBlur,
								ref: ref,
								invalid: invalid,
								isTouched: isTouched,
								isDirty: isDirty,
								label: label,
							}}
						>
							{label && (
								<LabelWrapper className="form-row-label-column" htmlFor={id}>
									{label}
									{required && <b>*</b>}
								</LabelWrapper>
							)}
							<InputWrapper className="form-row-input-column">
								{/* TODO */}
								{/* @ts-ignore */}
								<Context.Consumer children={children} />
								{helpText && <HelpText>{helpText}</HelpText>}
								{errors.map((err, index) => (
									<ErrorMessage key={index}>{err}</ErrorMessage>
								))}
							</InputWrapper>
						</Context.Provider>
					</>
				)}
			/>
		</Wrapper>
	);
};

export default FormRowController;
