import storage from 'js/storage';

const initialState = {
    templates: storage.get('TEMPLATES') || []
};

const reducer = {
    ADD_TEMPLATE(state, action) {
        state.pages.push(action.data);
    },
    MODIFY_TEMPLATE(state, action) {

    },
    DELETE_TEMPLATE() {

    }
};

export default function (state = initialState, action) {
    return reducer[action.type] ? reducer[action.type](state, action) : state;
}