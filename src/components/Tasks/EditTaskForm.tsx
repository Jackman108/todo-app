// src/components/EditTaskForm.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { editTask } from '../../redux/actions/taskActions';
import { TaskType } from '../../[types]/interface';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditTaskForm = ({ task }: { task: TaskType }) => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({

        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        endDate: new Date(task.endDate),

    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { // Укажите тип параметра 'e'
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const status = e.target.value;
        setFormData({ ...formData, status });
    };
    const handleDateChange = (date: Date) => {
        setFormData({ ...formData, endDate: date });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const updatedTask: TaskType = {
            ...task,
            title: formData.title,
            description: formData.description,
            priority: formData.priority,
            status: formData.status,
            endDate: formData.endDate.toISOString(),           
        };
        dispatch(editTask(task.id, updatedTask));
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
                    selected={formData.endDate}
                    onChange={handleDateChange}
                />
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditTaskForm;