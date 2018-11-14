import storage from 'js/storage';

const initialState = {
    pages: storage.get('PAGES') || []
};

const reducer = {
    ADD_PAGE(state, action) {
        state.pages.push(action.data);
    },
    MODIFY_PAGE(state, action) {

    },
    DELETE_PAGE() {

    }
};

export default function (state = initialState, action) {
    return reducer[action.type] ? reducer[action.type](state, action) : state;
}