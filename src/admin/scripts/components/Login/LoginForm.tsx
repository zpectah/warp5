import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

import { EMAIL_REGEX, ROUTES } from '../../constants';
import { Form } from '../ui';
import { useProfile } from '../../hooks/App';

const Wrapper = styled.div`
	width: 50vw;
	padding: 1rem 0;
`;

const LoginForm = () => {
	const { t } = useTranslation(['messages', 'component']);
	const [processing, setProcessing] = useState<boolean>(false);
	const [message, setMessage] = useState<string | null>(null);
	const { Profile, userLogin, reloadProfile, userLogout } = useProfile();
	const history = useHistory();
	const { control, handleSubmit, formState } = useForm({
		mode: 'all',
	});

	const submitHandler = (data) => {
		setProcessing(true);
		setMessage('');

		const master = {
			...data,
		};

		return userLogin(master).then((response) => {
			setProcessing(false);

			if (response?.data?.message) {
				switch (response.data.message) {
					case 'user_not_found':
						setMessage(t('messages:userLogin.user_not_found'));
						return null;

					case 'user_not_active':
						setMessage(t('messages:userLogin.user_not_active'));
						return null;

					case 'user_is_deleted':
						setMessage(t('messages:userLogin.user_is_deleted'));
						return null;

					case 'user_password_not_match':
						setMessage(t('messages:userLogin.user_password_not_match'));
						return null;

					case 'user_login_success':
						setMessage(t('messages:userLogin.user_login_success'));
						return reloadProfile().then(() => {
							window.location.href = ROUTES.app.dashboard.path;
						});
				}
			}
		});
	};

	const logoutHandler = () => {
		userLogout({}).then(() => reloadProfile());
	};

	const dashboardHandler = () => {
		history.push(ROUTES.app.dashboard.path);
	};

	const lostPasswordHandler = () => {
		history.push(ROUTES.app['lost-password'].path);
	};

	return (
		<Wrapper>
			<Form.Wrapper name="loginForm">
				{Profile ? (
					<>
						<Form.Row>
							<p>{t('component:LoginForm.alreadyLogIn')}</p>
						</Form.Row>
						<Form.Row justify="space-around">
							<Button
								type="button"
								variant="contained"
								color="primary"
								onClick={dashboardHandler}
							>
								{t('component:LoginForm.btn_returnToDashboard')}
							</Button>
							<Button
								type="button"
								variant="contained"
								color="secondary"
								onClick={logoutHandler}
							>
								{t('component:LoginForm.btn_logOut')}
							</Button>
						</Form.Row>
					</>
				) : (
					<>
						<Form.Row>
							<Controller
								name="email"
								control={control}
								rules={{ required: true, pattern: EMAIL_REGEX }}
								defaultValue={''}
								render={({ name, value, onChange }) => (
									<TextField
										id="loginForm_email"
										label={t('component:LoginForm.input_email_placeholder')}
										variant="outlined"
										type="email"
										name={name}
										value={value}
										onChange={onChange}
										disabled={processing}
										style={{ width: '100%' }}
									/>
								)}
							/>
						</Form.Row>
						<Form.Row>
							<Controller
								name="password"
								control={control}
								rules={{ required: true }}
								defaultValue={''}
								render={({ name, value, onChange }) => (
									<TextField
										id="loginForm_password"
										label={t('component:LoginForm.input_password_placeholder')}
										variant="outlined"
										type="password"
										name={name}
										value={value}
										onChange={onChange}
										disabled={processing}
										style={{ width: '100%' }}
									/>
								)}
							/>
						</Form.Row>
						<Form.Row>{message && <div>{message}</div>}</Form.Row>
						<Form.Row justify="space-around">
							<Button
								type="button"
								variant="contained"
								color="primary"
								onClick={handleSubmit(submitHandler)}
								disabled={!formState.isValid || processing}
							>
								{t('component:LoginForm.btn_submit')}
							</Button>
							<Button type="button" onClick={lostPasswordHandler}>
								{t('component:LoginForm.btn_lostPassword')}
							</Button>
						</Form.Row>
					</>
				)}
			</Form.Wrapper>
		</Wrapper>
	);
};

export default LoginForm;
