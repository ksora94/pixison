import {createStore} from 'redux';
import storage from "js/storage";

const initialState = {
    dataUrl: '',
    pageUrl: '',
    names: [],
    targets: [],
    rootFolder: storage.get('ROOT_FOLDER') || {},
    setting: storage.get('SETTING') || {}
};

const reducer = {
    SET_URL: function (state, action) {
        state.dataUrl = action.data.dataUrl;
        state.pageUrl = action.data.pageUrl;
        return {...state};
    },
    SET_NAMES: function (state, action) {
        state.names = action.data.filter(Boolean);
        return {...state};
    },
    SET_TARGETS: function (state, action) {
        state.targets = action.data.map(d => d || 'default');
        return {...state};
    },
    SET_ROOT_FOLDER: function (state, action) {
        state.rootFolder = action.data;
        return {...state};
    }
};

export default createStore(function (state = initialState, action) {
    return reducer[action.type]
        ? {...reducer[action.type](state, action)} : state;
})
