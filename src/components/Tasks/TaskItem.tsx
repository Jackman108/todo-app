// src/components/TaskItem.tsx
import React from 'react';
import { CommentType, SubtaskType, TaskType } from '../../[types]/interface';

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
            <p>Текущий статус: {task.status}</p>

            {/* Display subtasks */}
            <div className="subtasks">
                <h3>Подзадачи:</h3>
                <ul>
                    {task.subtasks.map((subtask: SubtaskType) => (
                        <li key={subtask.id}>{subtask.title}</li>
                    ))}
                </ul>
            </div>

            {/* Display comments */}
            <div className="comments">
                <h3>Комментарии:</h3>
                <ul>
                    {task.comments.map((comment: CommentType) => (
                        <li key={comment.id}>{comment.text}</li>
                    ))}
                </ul>
            </div>

            {/* Display files (assuming files are links) */}
            <div className="files">
                <h3>Файлы:</h3>
                <ul>
                    {task.files.map((file: string) => (
                        <li key={file}>
                            <a href={file} target="_blank" rel="noopener noreferrer">
                                {file}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TaskItem;
