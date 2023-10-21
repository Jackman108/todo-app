// src/components/EditTaskForm.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { editTask } from '../../redux/actions/taskActions';
import { TaskType } from '../../[types]/interface';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface EditTaskModalProps {
    task: TaskType;
    onClose: () => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ task, onClose }) => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState<TaskType>({
        ...task,
        endDate: task.endDate ? new Date(task.endDate).toISOString() : '',    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { // Укажите тип параметра 'e'
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const status = e.target.value;
        setFormData({ ...formData, status });
    };
    const handleDateChange = (date: Date) => {
        setFormData({ ...formData, endDate: date ? date.toISOString() : '' });    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const updatedTask: TaskType = {
            ...formData,
            endDate: formData.endDate ? formData.endDate.toString() : '',
        };
        dispatch(editTask(task.id, updatedTask));
        onClose();
    };

    return (
        <div>
            <h2>Edit Task</h2>
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
                    selected={formData.endDate ? new Date(formData.endDate) : new Date(task.endDate)}
                    onChange={handleDateChange}
                />
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditTaskModal;