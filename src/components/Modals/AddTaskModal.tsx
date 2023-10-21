// src/components/TaskForm.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TaskType } from '../../[types]/interface';
import DatePicker from "react-datepicker";
import generateUniqueId from '../../helpers/generateUniqueId';

interface AddTaskModalProps {
    projectId: number;
    onClose: () => void;
    onAddTask: (newTask: TaskType) => void;
}
const AddTaskModal: React.FC<AddTaskModalProps> = ({ projectId, onClose, onAddTask }) => {

    const [formData, setFormData] = useState<TaskType>({
        id: 0,
        title: '',
        description: '',
        creationDate: new Date().toISOString(),
        timeInWork: '0 hours',
        endDate: '',
        priority: 'High',
        files: [],
        status: 'Queue',
        subtasks: [],
        comments: [],
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { // Укажите тип параметра 'e'
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (date: Date | null) => {
        if (date) {
            setFormData({ ...formData, creationDate: date.toISOString() });
        }
    };

    const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const status = e.target.value;
        setFormData({ ...formData, status });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.title.trim() === '') {
            return;
        }

        const newTask: TaskType = {
            ...formData,
            id: generateUniqueId(),
        };
        onAddTask(newTask);
        setFormData({
            id: 0,
            title: '',
            description: '',
            creationDate: new Date().toISOString(),
            timeInWork: '0 hours',
            endDate: '',
            priority: 'High',
            files: [],
            status: 'Queue',
            subtasks: [],
            comments: [],
        });
        onClose();
    };

    return (
        <div>
            <h2>Create New Task</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Title"
                />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                />
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleStatusChange}
                >
                    <option value="Queue">Queue</option>
                    <option value="Development">Development</option>
                    <option value="Done">Done</option>
                </select>
                <DatePicker
                    selected={formData.creationDate ? new Date(formData.creationDate) : null}
                    onChange={handleDateChange}
                />
                <button type="submit">Create Task</button>
                <button onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default AddTaskModal;
