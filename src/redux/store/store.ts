import { createStore, combineReducers } from 'redux';
import {taskReducer} from '../reducers/taskReducer';
import { projectReducer} from '../reducers/projectReducer';

const rootReducer = combineReducers({
    projects: projectReducer,
    tasks: taskReducer,
});

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
