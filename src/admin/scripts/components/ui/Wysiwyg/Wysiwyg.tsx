import React, { useState } from 'react';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import styled from 'styled-components';

// https://blog.logrocket.com/building-rich-text-editors-in-react-using-draft-js-and-react-draft-wysiwyg/

import toolbar from './toolbar';

const Wrapper = styled.div<{ height?: WysiwygProps['height'] }>`
	width: 100%;
	height: ${(props) => props.height};
	position: relative;
	border: ${(props) => props.theme.wysiwyg.border};
	border-radius: 0.125rem;

	.rdw-editor-main {
		margin: 0 1rem;
	}
`;

export interface WysiwygProps {
	id?: string;
	value: string | any;
	onChange: (value: string | any) => void;
	placeholder?: string;
	height?: string | 'responsive';
}

const Wysiwyg: React.FC<WysiwygProps> = ({
	id,
	value,
	onChange,
	placeholder,
	height = '300px',
}) => {
	const [editorState, setEditorState] = useState(() =>
		value
			? EditorState.createWithContent(
					ContentState.createFromBlockArray(convertFromHTML(value)),
			  )
			: EditorState.createEmpty(),
	);

	const handleEditorChange = (state) => {
		setEditorState(state);
		convertContentToHTML();
	};
	const convertContentToHTML = () => {
		let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
		onChange(currentContentAsHTML);
	};

	return (
		<Wrapper height={height}>
			<Editor
				defaultEditorState={editorState}
				onEditorStateChange={handleEditorChange}
				placeholder={placeholder}
				toolbar={toolbar}
				// wrapperStyle={<wrapperStyleObject>}
				// editorStyle={<editorStyleObject>}
				// toolbarStyle={<toolbarStyleObject>}
			/>
		</Wrapper>
	);
};

export default Wysiwyg;
