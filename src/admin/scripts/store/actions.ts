import {
	SIDEBAR_TOGGLE,
	THEME_TOGGLE,
	HELP_TOGGLE,
	ADD_TOAST,
	REMOVE_TOAST,
	ADD_MESSAGE,
	REMOVE_MESSAGE,
} from './types';

export function sidebarToggle(payload) {
	return { type: SIDEBAR_TOGGLE, payload };
}

export function themeToggle(payload) {
	return { type: THEME_TOGGLE, payload };
}

export function helpToggle(payload) {
	return { type: HELP_TOGGLE, payload };
}

export function addToast(payload) {
	return { type: ADD_TOAST, payload };
}

export function removeToast(payload) {
	return { type: REMOVE_TOAST, payload };
}

export function addMessage(payload) {
	return { type: ADD_MESSAGE, payload };
}

export function removeMessage(payload) {
	return { type: REMOVE_MESSAGE, payload };
}
