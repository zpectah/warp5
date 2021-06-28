import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import AudioTrackIcon from '@material-ui/icons/AudioTrack';
import MovieIcon from '@material-ui/icons/Movie';
import DescriptionIcon from '@material-ui/icons/Description';
import SaveIcon from '@material-ui/icons/Save';

import { UploadsItemProps } from '../../../types/App';

interface FileIconProps {
	type: UploadsItemProps['type'];
	fontSize?: 'inherit' | 'small' | 'medium' | 'large';
}

const FileIcon = ({ type, fontSize = 'inherit' }: FileIconProps) => {
	const component = {
		image: ImageIcon,
		audio: AudioTrackIcon,
		video: MovieIcon,
		document: DescriptionIcon,
		archive: SaveIcon,
	};

	const ComponentName = component[type];

	return (
		<Avatar className="file-icon-avatar">
			<ComponentName fontSize={fontSize} />
		</Avatar>
	);
};

export default FileIcon;
