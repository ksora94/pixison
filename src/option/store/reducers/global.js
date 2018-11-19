const initialState = {
    token: null,
    rootFolder: localStorage.getItem('ROOT_FOLDER')
};

const reducer = {
    SET_TOKEN: function (state, action) {
        state.token = action.data;
        return {...state};
    },
    SET_ROOT_FOLDER: function (state, action) {
        state.id = action.id;
        return {...state};
    }
};

export default function (state = initialState, action) {
    return reducer[action.type] ? reducer[action.type](state, action) : state;
}
