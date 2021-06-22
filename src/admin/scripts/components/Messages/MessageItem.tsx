import React from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

import { messageItemProps } from '../../types/types';
import { CloseButton } from '../ui';
import { useTranslation } from 'react-i18next';

const Wrapper = styled.article`
	width: 100%;
	height: auto;
	padding: 0;
	margin: 0.125rem 0 0 0;
	position: relative;
	color: ${(props) => props.theme.messages.default.color};
	background-color: ${(props) => props.theme.messages.default.bg};

	.btn-close {
		width: 40px;
		height: 40px;
		position: absolute;
		top: 0;
		right: 0;
		opacity: 0.5;

		&:hover {
			opacity: 1;
		}
	}
`;
const Inner = styled.div`
	height: auto;
	padding: 2rem;
	display: flex;
	flex-direction: column;
`;
const Title = styled.div`
	padding: 0 0 1rem;
	display: flex;
`;
const Content = styled.div`
	display: flex;
`;
const Footer = styled.div`
	padding: 1rem 0 0;
	display: flex;
	justify-content: flex-end;
`;

interface MessageItemProps {
	data: messageItemProps;
	onRemove: (data: messageItemProps) => void;
}

const MessageItem = ({ data, onRemove }: MessageItemProps) => {
	const { t } = useTranslation(['common']);

	return (
		<Wrapper className="message-item" id={data.id}>
			<Inner>
				{data.title && <Title>{data.title}</Title>}
				{data.content && <Content>{data.content}</Content>}
				<Footer>
					{data.onConfirm ? (
						<>
							<Button
								type="button"
								onClick={() => onRemove(data)}
								color="inherit"
							>
								{t('btn.cancel')}
							</Button>
							<Button
								type="button"
								onClick={() => {
									data.onConfirm();
									onRemove(data);
								}}
								variant="contained"
								color="primary"
								style={{ marginLeft: '.5rem' }}
							>
								{t('btn.confirm')}
							</Button>
						</>
					) : (
						<>
							<Button
								type="button"
								onClick={() => onRemove(data)}
								color="inherit"
							>
								{t('btn.close')}
							</Button>
						</>
					)}
				</Footer>
			</Inner>
		</Wrapper>
	);
};

export default MessageItem;
