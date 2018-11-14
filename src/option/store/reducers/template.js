import storage from 'js/storage';

const templates = storage.get('TEMPLATES');

const initialState = {
    templates: templates || [],
    selected: templates ? templates[0].name : null
};

const reducer = {
    SELECT_TEMPLATE(state, action) {
        state.selected = action.data;
        return {...state};
    },
    ADD_TEMPLATE(state, action) {
        storage.set('TEMPLATES', state.templates = [...state.templates, ({
            system: false,
            ...action.data
        })]);

        return {...state};
    },
    MODIFY_TEMPLATE(state, action) {
        const templates = state.templates;
        const index = templates.findIndex(item => item.name === action.data);

        if (index < 0) return;
        templates[index] = action.data;
        storage.set('TEMPLATES', state.templates = [...templates]);

        return {...state};
    },
    DELETE_TEMPLATE(state, action) {
        const templates = state.templates;
        const index = templates.findIndex(item => item.name === action.data);
        const template = templates[index];

        if (!template || template.system) return;
        if (template.name === state.selected) {
            state.selected = templates[0].name;
        }
        templates.splice(index, 1);
        storage.set('TEMPLATES', state.templates = [...templates]);

        return {...state};
    }
};

export default function (state = initialState, action) {
    return reducer[action.type] ? reducer[action.type](state, action) : state;
}