//taskReducer.ts

import { TaskState } from "../../[types]/interface";

const initialState: TaskState = {
    tasks: [],
    projects: [],
};

const taskReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SELECT_PROJECT':
            return {
                ...state,
                projects: [...state.projects, action.payload],
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
            
        case 'ADD_TASK':
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
            };
        case 'EDIT_TASK':
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.payload.taskId ? { ...task, ...action.payload.updatedTask } : task
                ),
            };
        case 'DELETE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.payload),
            };
        case 'CHANGE_TASK_STATUS':
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.payload.taskId ? { ...task, status: action.payload.newStatus } : task
                ),
            };
        case 'ADD_SUBTASK':
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.payload.taskId
                        ? { ...task, subtasks: [...(task.subtasks || []), action.payload.newSubtask] }
                        : task
                ),
            };
        case 'EDIT_SUBTASK':
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.payload.taskId
                        ? {
                            ...task,
                            subtasks: task.subtasks.map((subtask) =>
                                subtask.id === action.payload.subtaskId ? { ...subtask, ...action.payload.updatedSubtask } : subtask
                            ),
                        }
                        : task
                ),
            };
        case 'DELETE_SUBTASK':
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.payload.taskId
                        ? { ...task, subtasks: (task.subtasks || []).filter((subtask) => subtask.id !== action.payload.subtaskId) }
                        : task
                ),
            };
        case 'ADD_COMMENT':
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.payload.taskId
                        ? { ...task, comments: [...(task.comments || []), action.payload.newComment] }
                        : task
                ),
            };
        case 'EDIT_COMMENT':
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.payload.taskId
                        ? {
                            ...task,
                            comments: task.comments.map((comment) =>
                                comment.id === action.payload.commentId ? { ...comment, ...action.payload.updatedComment } : comment
                            ),
                        }
                        : task
                ),
            };
        case 'DELETE_COMMENT':
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.payload.taskId
                        ? { ...task, comments: (task.comments || []).filter((comment) => comment.id !== action.payload.commentId) }
                        : task
                ),
            };
        case 'SEARCH_TASKS':
            // Реализуйте поиск задач по номеру и заголовку
            return state;
        default:
            return state;
    }
};

export default taskReducer;
