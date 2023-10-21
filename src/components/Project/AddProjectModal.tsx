// src/components/TaskForm.tsx
import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ProjectType } from '../../[types]/interface';
import generateUniqueId from '../../helpers/generateUniqueId';
import { addProject } from '../../redux/actions/taskActions';

const AddProjectModal = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (title.trim() !== '') {
            const newProject: ProjectType = {
                projectId: generateUniqueId(),
                title,
            };
            dispatch(addProject(newProject));
            setTitle('');
        }
    };

    return (
        <div>
            <h2>Create New Project</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleInputChange}
                    placeholder="Title"
                />


                <button type="submit">Create Project</button>
            </form>
        </div>
    );
};

export default AddProjectModal;
