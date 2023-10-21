//taskReducer.ts

import { TaskState } from "../../[types]/interface";

const initialState: TaskState = {
    tasks: [],
    projects: [],
};


const taskReducer = (
    state = initialState,
    action: {
        type: string, payload?: any
    }) => {
    switch (action.type) {
        case 'ADD_TASK':
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
            };

        case 'EDIT_TASK':
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.payload.taskId ? action.payload.updatedTask : task
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
                    task.id === action.payload.taskId
                        ? { ...task, status: action.payload.newStatus }
                        : task
                ),
            };
        case 'ADD_SUBTASK':
            return {
                ...state,
                tasks: state.tasks.map((task) => {
                    if (task.id === action.payload.taskId) {
                        return {
                            ...task,
                            subtasks: [...task.subtasks, action.payload.newSubtask],
                        };
                    }
                    return task;
                }),
            };
        case 'EDIT_SUBTASK':
            return {
                ...state,
                tasks: state.tasks.map((task) => {
                    if (task.id === action.payload.taskId) {
                        return {
                            ...task,
                            subtasks: task.subtasks.map((subtask) =>
                                subtask.id === action.payload.subtaskId
                                    ? action.payload.updatedSubtask
                                    : subtask
                            ),
                        };
                    }
                    return task;
                }),
            };
        case 'DELETE_SUBTASK':
            return {
                ...state,
                tasks: state.tasks.map((task) => {
                    if (task.id === action.payload.taskId) {
                        return {
                            ...task,
                            subtasks: task.subtasks.filter(
                                (subtask) => subtask.id !== action.payload.subtaskId
                            ),
                        };
                    }
                    return task;
                }),
            };
        case 'ADD_COMMENT':
            return {
                ...state,
                tasks: state.tasks.map((task) => {
                    if (task.id === action.payload.taskId) {
                        return {
                            ...task,
                            comments: [...task.comments, action.payload.newComment],
                        };
                    }
                    return task;
                }),
            };
        case 'EDIT_COMMENT':
            return {
                ...state,
                tasks: state.tasks.map((task) => {
                    if (task.id === action.payload.taskId) {
                        return {
                            ...task,
                            comments: task.comments.map((comment) =>
                                comment.id === action.payload.commentId
                                    ? action.payload.updatedComment
                                    : comment
                            ),
                        };
                    }
                    return task;
                }),
            };
        case 'DELETE_COMMENT':
            return {
                ...state,
                tasks: state.tasks.map((task) => {
                    if (task.id === action.payload.taskId) {
                        return {
                            ...task,
                            comments: task.comments.filter(
                                (comment) => comment.id !== action.payload.commentId
                            ),
                        };
                    }
                    return task;
                }),
            };
        case 'SEARCH_TASKS':
            const searchQuery = action.payload;
            const filteredTasks = state.tasks.filter((task) => {
                return (
                    task.id.toString().includes(searchQuery) ||
                    task.title.toLowerCase().includes(searchQuery.toLowerCase())
                );
            });
            return { ...state, filteredTasks };

        default:
            return state;
    }
};

export { taskReducer };
