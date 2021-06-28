import React from 'react';
import Avatar from '@material-ui/core/Avatar';

import { useProfile } from '../../hooks/App';

interface ProfileAvatarProps {}

const ProfileAvatar = ({}: ProfileAvatarProps) => {
	const { Profile } = useProfile();

	if (Profile.img_avatar) {
		return (
			<Avatar
				src={Profile.img_avatar}
				alt={Profile.nickname}
				className="profile-avatar"
			/>
		);
	} else {
		return (
			<Avatar className="profile-avatar">
				{Profile.first_name && Profile.last_name
					? Profile.first_name.charAt(0) + Profile.last_name.charAt(0)
					: Profile.nickname.charAt(0)}
			</Avatar>
		);
	}
};

export default ProfileAvatar;
