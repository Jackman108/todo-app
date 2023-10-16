//taskActions.ts
// Действия для управления задачами

import { CommentType, ProjectType, SubtaskType, TaskType } from "../../[types]/interface";

export const selectProject = (project: ProjectType) => ({
    type: 'SELECT_PROJECT',
    payload: project,
});

// Добавление проекта
export const addProject = (newProject: ProjectType) => ({
    type: 'ADD_PROJECT',
    payload: newProject,
});

// Удаление проекта
export const deleteProject = (projectId: number) => ({
    type: 'DELETE_PROJECT',
    payload: projectId,
});

// Добавление задачи
export const addTask = (newTask: TaskType) => ({
    type: 'ADD_TASK',
    payload: newTask,
});

// Редактирование задачи
export const editTask = (taskId: number, updatedTask: TaskType) => ({
    type: 'EDIT_TASK',
    payload: { taskId, updatedTask },
});

// Удаление задачи
export const deleteTask = (taskId: number) => ({
    type: 'DELETE_TASK',
    payload: taskId,
});

// Изменение статуса задачи
export const changeTaskStatus = (taskId: number, newStatus: string) => ({
    type: 'CHANGE_TASK_STATUS',
    payload: { taskId, newStatus },
});

// Добавление подзадачи
export const addSubtask = (taskId: number, newSubtask: SubtaskType) => ({
    type: 'ADD_SUBTASK',
    payload: { taskId, newSubtask },
});

// Редактирование подзадачи
export const editSubtask = (taskId: number, subtaskId: number, updatedSubtask: SubtaskType) => ({
    type: 'EDIT_SUBTASK',
    payload: { taskId, subtaskId, updatedSubtask },
});

// Удаление подзадачи
export const deleteSubtask = (taskId: number, subtaskId: number) => ({
    type: 'DELETE_SUBTASK',
    payload: { taskId, subtaskId },
});

// Добавление комментария
export const addComment = (taskId: number, newComment: CommentType) => ({
    type: 'ADD_COMMENT',
    payload: { taskId, newComment },
});

// Редактирование комментария
export const editComment = (taskId: number, commentId: number, updatedComment: CommentType) => ({
    type: 'EDIT_COMMENT',
    payload: { taskId, commentId, updatedComment },
});

// Удаление комментария
export const deleteComment = (taskId: number, commentId: number) => ({
    type: 'DELETE_COMMENT',
    payload: { taskId, commentId },
});

// Поиск задач по номеру и заголовку
export const searchTasks = (searchQuery: string) => ({
    type: 'SEARCH_TASKS',
    payload: searchQuery,
});