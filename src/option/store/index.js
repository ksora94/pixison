import {createStore, combineReducers} from 'redux';
import pageReducers from './reducers/pageReducers';
import templateReducers from './reducers/templateReducers';

const reducers = combineReducers({
    pageReducers, templateReducers
});

export default createStore(reducers);