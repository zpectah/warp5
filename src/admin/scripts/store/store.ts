import { storage } from '../../../libs/utils';
import config from '../config';
import LangService from '../service/LanguageService';
import ThemeService from '../service/ThemeService';
import HelpService from '../service/HelpService';
import { storeProps } from '../types/types';

const UiStoreState: storeProps = {
	language: LangService.get(),
	theme: ThemeService.get(),
	help: HelpService.get(),
	sideBarOpen: storage.get(config.GLOBAL.CMS.STORAGE_KEY_UI_SIDEBAR) === 'true',
};

export default UiStoreState;
