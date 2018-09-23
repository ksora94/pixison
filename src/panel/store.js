import {createStore} from 'redux';

const initialState = {
    token: null,
    dataUrl: ''
};

const reducer = {
    SET_TOKEN: function (state, action) {
        state.token = action.data;
        return state;
    },
    SET_DATA_URL: function (state, action) {
        state.dataUrl = action.data;
        return state;
    }
};

export default createStore(function (state = initialState, action) {
    return reducer[action.type]
        ? Object.assign({}, reducer[action.type](state, action)) : state;
})