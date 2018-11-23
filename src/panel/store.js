import {createStore} from 'redux';
import storage from "js/storage";

const initialState = {
    token: null,
    dataUrl: '',
    names: [],
    targets: [],
    rootFolder: storage.get('ROOT_FOLDER') || {},
};

const reducer = {
    SET_TOKEN: function (state, action) {
        state.token = action.data;
        return {...state};
    },
    SET_DATA_URL: function (state, action) {
        state.dataUrl = action.data;
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
