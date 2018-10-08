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
    if (!get('PAGES')) {
        set('PAGES', cst.DEFAULT_PAGES);
    }
    if (!get('TEMPLATES')) {
        set('TEMPLATES', cst.DEFAULT_TEMPLATES);
    }
}

export default {
    get, set, init
}