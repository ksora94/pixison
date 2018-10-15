import {createStore} from 'redux';

const initialState = {
    token: null,
    dataUrl: '',
    name: ''
};

const reducer = {
    SET_TOKEN: function (state, action) {
        state.token = action.data;
        return state;
    },
    SET_DATA_URL: function (state, action) {
        state.dataUrl = action.data;
        return state;
    },
    SET_NAME: function (state, action) {
        state.name = action.data;
        return state;
    }
};

export default createStore(function (state = initialState, action) {
    return reducer[action.type]
        ? {...reducer[action.type](state, action)} : state;
})