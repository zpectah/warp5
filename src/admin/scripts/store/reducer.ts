import { storage, string } from '../../../libs/utils';
import config from '../config';
import LangService from '../service/LanguageService';
import ThemeService from '../service/ThemeService';
import HelpService from '../service/HelpService';
import UiStoreState from './store';
import {
	LANGUAGE_TOGGLE,
	SIDEBAR_TOGGLE,
	THEME_TOGGLE,
	HELP_TOGGLE,
	ADD_TOAST,
	REMOVE_TOAST,
	ADD_MESSAGE,
	REMOVE_MESSAGE,
} from './types';

function Reducer(state = UiStoreState, action) {
	let newToast, newMessage;

	switch (action.type) {
		case LANGUAGE_TOGGLE:
			LangService.set(action.payload);
			return Object.assign({}, state, {
				language: action.payload,
			});

		case THEME_TOGGLE:
			ThemeService.set(action.payload);
			return Object.assign({}, state, {
				theme: action.payload,
			});

		case HELP_TOGGLE:
			HelpService.set(action.payload);
			console.log(typeof action.payload, action.payload);
			return Object.assign({}, state, {
				help: action.payload,
			});

		case SIDEBAR_TOGGLE:
			storage.set(config.GLOBAL.CMS.STORAGE_KEY_UI_SIDEBAR, action.payload);
			return Object.assign({}, state, {
				sideBarOpen: action.payload,
			});

		case ADD_TOAST:
			newToast = {
				...action.payload,
				id: string.getToken(3, ''),
			};
			return Object.assign({}, state, {
				toasts: [newToast, ...state.toasts],
			});

		case REMOVE_TOAST:
			return Object.assign({}, state, {
				toasts: state.toasts.filter((item) => {
					return item.id !== action.payload.id;
				}),
			});

		case ADD_MESSAGE:
			newMessage = {
				...action.payload,
				id: string.getToken(3, ''),
			};
			return Object.assign({}, state, {
				messages: [newMessage, ...state.messages],
			});

		case REMOVE_MESSAGE:
			return Object.assign({}, state, {
				messages: state.messages.filter((item) => {
					return item.id !== action.payload.id;
				}),
			});
	}

	return state;
}

export default Reducer;
