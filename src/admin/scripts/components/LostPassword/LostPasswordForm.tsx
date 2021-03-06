import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

import config from '../../config';
import { useProfile } from '../../hooks/App';
import { EMAIL_REGEX, ROUTES } from '../../constants';
import { Form } from '../ui';
import useUiToasts from '../../hooks/useUiToasts';

const Wrapper = styled.div`
	width: 50vw;
	padding: 1rem 0;
`;

const LostPasswordForm = () => {
	const { t } = useTranslation(['messages', 'component']);
	const { token } = useParams<any>();
	const [processing, setProcessing] = useState<boolean>(false);
	const [message, setMessage] = useState<string | null>(null);
	const [requestSend, setRequestSend] = useState<boolean>(false);
	const { userLostPassword, userLostPasswordReset, reloadProfile } =
		useProfile();
	const dispatch = useDispatch();
	const { createToasts } = useUiToasts(dispatch);
	const { control, handleSubmit, formState } = useForm({
		mode: 'all',
	});
	const history = useHistory();

	const submitHandler = (data) => {
		setProcessing(true);
		setMessage('');

		const master = {
			...data,
		};

		return userLostPassword(master).then((response) => {
			setProcessing(false);

			if (response?.data?.message) {
				switch (response.data.message) {
					case 'user_not_found':
						setMessage(t('message:userLostPassword.user_not_found'));
						return null;

					case 'user_not_active':
						setMessage(t('message:userLostPassword.user_not_active'));
						return null;

					case 'user_is_deleted':
						setMessage(t('message:userLostPassword.user_is_deleted'));
						return null;

					case 'request_was_send':
						return reloadProfile().then(() => {
							setMessage(t('message:userLostPassword.request_was_send'));
						});
				}
			}
		});
	};

	const parameterHandler = (token) => {
		setProcessing(true);
		setMessage('');

		return userLostPasswordReset({ token: token }).then((response) => {
			setRequestSend(true);
			setProcessing(false);

			if (response?.data?.message) {
				switch (response.data.message) {
					case 'user_password_reset_error':
						createToasts({
							title: t(
								'message:userLostPassword.reset.user_password_reset_error',
							),
							context: 'error',
						});
						// history.push(CFG.CMS.UNAUTHORIZED_REDIRECT_TARGET);
						break;

					case 'token_not_found':
						createToasts({
							title: t('message:userLostPassword.reset.token_not_found'),
							context: 'error',
						});
						history.push(config.GLOBAL.CMS.UNAUTHORIZED_REDIRECT_TARGET);
						break;

					case 'request_not_found':
						createToasts({
							title: t('message:userLostPassword.reset.request_not_found'),
							context: 'error',
						});
						history.push(config.GLOBAL.CMS.UNAUTHORIZED_REDIRECT_TARGET);
						break;

					case 'user_password_already_reset':
						createToasts({
							title: t(
								'message:userLostPassword.reset.user_password_already_reset',
							),
							context: 'error',
						});
						history.push(config.GLOBAL.CMS.UNAUTHORIZED_REDIRECT_TARGET);
						break;

					case 'user_password_reset_success':
						createToasts({
							title: t(
								'message:userLostPassword.reset.user_password_reset_success',
							),
							context: 'success',
						});
						history.push(config.GLOBAL.CMS.UNAUTHORIZED_REDIRECT_TARGET);
						break;
				}
			}
		});
	};

	const loginHandler = () => {
		history.push(ROUTES.app.login.path);
	};

	useEffect(() => {
		if (token && !requestSend) parameterHandler(token);
	}, [token]);

	return (
		<Wrapper>
			<Form.Base name="lostPasswordForm">
				{token ? (
					<>
						<Form.Row>{t('component:LostPasswordForm.processing')}</Form.Row>
						<Form.Row>{message && <div>{message}</div>}</Form.Row>
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
										id="lostPasswordForm_email"
										label={t('component:LostPasswordForm.input_email_label')}
										placeholder={t(
											'component:LostPasswordForm.input_email_placeholder',
										)}
										variant="outlined"
										type="email"
										name={name}
										value={value}
										onChange={onChange}
										disabled={processing}
										size="small"
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
								{t('component:LostPasswordForm.btn_submit')}
							</Button>
							<Button type="button" onClick={loginHandler}>
								{t('component:LostPasswordForm.btn_logIn')}
							</Button>
						</Form.Row>
					</>
				)}
			</Form.Base>
		</Wrapper>
	);
};

export default LostPasswordForm;
