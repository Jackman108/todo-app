//projectReducer.ts

import { TaskState } from "../../[types]/interface";

const initialState: TaskState = {
    tasks: [],
    projects: [],
};

const projectReducer = (
    state = initialState,
    action: {
        type: string, payload?: any
    }) => {
    switch (action.type) {
        case 'SELECT_PROJECT':
            return {
                ...state,
                selectedProject: action.payload,
            };

        case 'ADD_PROJECT':
            return {
                ...state,
                projects: [...state.projects, action.payload],
            };

        case 'DELETE_PROJECT':
            return {
                ...state,
                projects: state.projects.filter((project) => project.projectId !== action.payload),
            };

        default:
            return state;
    }
};

export { projectReducer };
