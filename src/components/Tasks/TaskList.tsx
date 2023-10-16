// src/components/TaskList.tsx
import React from 'react';
import TaskItem from './TaskItem'; // Импортируйте TaskItem
import { TaskType } from '../../[types]/interface';

interface TaskListProps {
    tasks: TaskType[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
    return (
        <div className="task-list">
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} /> 
            ))}
        </div>
    );
};

export default TaskList;
