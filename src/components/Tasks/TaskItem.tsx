// src/components/TaskItem.tsx
import React from 'react';
import { TaskType } from '../../[types]/interface';

interface TaskItemProps {
    task: TaskType;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    return (
        <div className="task-item">
            <h2>Задача #{task.id}</h2>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Дата создания: {new Date(task.creationDate).toLocaleString()}</p>
            <p>Время в работе: {task.timeInWork}</p>
            <p>Дата окончания: {task.endDate ? new Date(task.endDate).toLocaleString() : 'N/A'}</p>
            <p>Приоритет: {task.priority}</p>
            {/* Вложенные файлы */}
            <p>Текущий статус: {task.status}</p>
            {/* Другие свойства задачи */}
        </div>
    );
};

export default TaskItem;
