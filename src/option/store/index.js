import {createStore, combineReducers} from 'redux';
import global from './reducers/global';
import page from './reducers/page';

const reducers = combineReducers({
    page, global
});

export default createStore(reducers);
