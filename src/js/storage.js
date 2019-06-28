import _ from 'lodash';
import cst from 'js/constant';
import {autoSyncToDrive} from './sync';

const s = localStorage;

function get(key) {
    const data = s.getItem(key);

    if (!data) return undefined;
    try {
        return JSON.parse(data);
    } catch (e) {
        console.error('No exist key');
        return undefined;
    }
}

function set(key, data) {
    if (_.isObject(data)) {
        s.setItem(key, JSON.stringify(data));
    }
    if (_.isNull(data)) {
        s.removeItem(key);
    }
}

function init() {
    const pages = get('PAGES');
    const setting = get ('SETTING');

    if (pages) {
        pages.some((page, index) => {
            if (page.target === 'default') {
                pages[index] = cst.DEFAULT_PAGES[0];
                return true;
            }
            return false;
        });
        set('PAGES', pages);
    } else {
        set('PAGES', cst.DEFAULT_PAGES);
    }

    if (setting) {
        _.forIn(cst.DEFAULT_SETTING, (value, key) => {
            if (!setting.hasOwnProperty(key)) {
                setting[key] = value;
            }
        });
        set('SETTING', setting)
    } else {
        set('SETTING', cst.DEFAULT_SETTING);
    }
}

export default {
    get, set, init
}
