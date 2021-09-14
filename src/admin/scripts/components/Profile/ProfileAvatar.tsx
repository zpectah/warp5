import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Redirect } from 'react-router-dom';

import { useProfile } from '../../hooks/App';
import config from "../../config";

interface ProfileAvatarProps {}

const ProfileAvatar = ({}: ProfileAvatarProps) => {
	const { Profile } = useProfile();

	if (Profile) {
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
	} else {
		return <Redirect to={config.GLOBAL.CMS.RESTRICTED_REDIRECT_TARGET} />;
	}

};

export default ProfileAvatar;
