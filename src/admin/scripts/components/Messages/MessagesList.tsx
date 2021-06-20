import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { removeMessage } from '../../store/actions';
import { messageItemProps } from '../../types/types';
import MessageItem from './MessageItem';

const Wrapper = styled.div`
	width: 100%;
	height: auto;
	position: fixed;
	overflow: visible;
	bottom: 0;
	left: 0;
	z-index: ${(props) => props.theme.messages.zIndex};
`;
const FloatingList = styled.div``;

interface MessagesListProps {}

const MessagesList = ({}: MessagesListProps) => {
	const store = useSelector((store: any) => store);
	const dispatch = useDispatch();
	const [itemsList, setItemsList] = useState<messageItemProps[]>(
		store.ui.messages,
	);

	useEffect(() => setItemsList(store.ui.messages), [store.ui.messages]);

	const removeHandler = (data) => {
		dispatch(removeMessage(data));
	};

	return (
		<Wrapper>
			<FloatingList>
				{itemsList.map((item) => (
					<MessageItem onRemove={removeHandler} data={item} key={item.id} />
				))}
			</FloatingList>
		</Wrapper>
	);
};

export default MessagesList;
