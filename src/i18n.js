import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import common_en from './lang/en.json';
import common_pl from './lang/pl.json';

const resources = {
    en: {
        translation: common_en
    },
    pl: {
        translation: common_pl
    }
}

i18n
.use(initReactI18next)
.init({
    resources,
    lng: 'en',
    keySeparator: false,
    interpolation: {
        escapeValue: false
    }
});

export default i18n;