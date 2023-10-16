// src/components/TaskForm.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../redux/actions/taskActions';
import { TaskType } from '../../[types]/interface';
import DatePicker from "react-datepicker";
import generateUniqueTaskId from '../../helpers/generateUniqueTaskId';

const TaskForm = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        id: 0,
        title: '',
        description: '',
        subtasks: '',
        comments: '',
        status: '',
        priority: '',
        creationDate: new Date().toISOString(),
        timeInWork: '',
        endDate: '',
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { // Укажите тип параметра 'e'
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const currentDate = new Date();
    const creationDate = new Date(formData.creationDate);

    const timeDifference = currentDate.getTime() - creationDate.getTime();
    const hoursInWork = timeDifference / (1000 * 60 * 60);

    const formattedTimeInWork = `${hoursInWork.toFixed(2)} hours`;

    const handleDateChange = (date: Date | null) => {
        if (date) {
            setFormData({ ...formData, creationDate: date.toISOString() });
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newTask: TaskType = {
            id: generateUniqueTaskId(),
            title: formData.title,
            description: formData.description,
            subtasks: [],
            comments: [],
            status: 'Queue',
            priority: 'High',
            creationDate: formData.creationDate || currentDate.toISOString(),
            timeInWork: '0 hours',
            endDate: '',
        };
        dispatch(addTask(newTask));
        setFormData({
            id: 0,
            title: '',
            description: '',
            subtasks: '',
            comments: '',
            status: '',
            priority: '',
            creationDate: currentDate.toISOString(),
            timeInWork: formattedTimeInWork,
            endDate: '',
        });
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
                <DatePicker
                    selected={formData.creationDate ? new Date(formData.creationDate) : null}
                    onChange={handleDateChange}
                />
                <button type="submit">Create Task</button>
            </form>
        </div>
    );
};

export default TaskForm;
