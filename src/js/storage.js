import _ from 'lodash';
import cst from 'js/constant';

const s = localStorage;

function get(key) {
    const data = s.getItem(key);

    if (!data) return undefined;
    try {
        return JSON.parse(data);
    } catch(e) {
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

    if (!pages) {
        set('PAGES', cst.DEFAULT_PAGES);
        set('SETTING', cst.DEFAULT_SETTING);
    } else {
        pages.some((page, index) => {
            if (page.target === 'default') {
                pages[index] = cst.DEFAULT_PAGES[0];
                return true;
            }
            return false;
        });
        set('PAGES', pages);
    }
}

export default {
    get, set, init
}
