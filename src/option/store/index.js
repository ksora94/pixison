import {createStore, combineReducers} from 'redux';
import page from './reducers/page';
import template from './reducers/template';

const reducers = combineReducers({
    page, template
});

export default createStore(reducers);