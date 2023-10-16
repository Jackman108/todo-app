// src/components/ProjectSelectionPage.tsx
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { selectProject, addProject, deleteProject } from '../redux/actions/taskActions';
import { ProjectSelectionPageProps, ProjectType } from '../[types]/interface';
import generateUniqueTaskId from '../helpers/generateUniqueTaskId';

const ProjectSelectionPage: React.FC<ProjectSelectionPageProps> = ({
    projects,
    selectedProject,
    selectProject,
    addProject,
    deleteProject
}) => {
    const [newProjectTitle, setNewProjectTitle] = useState('');

    const handleAddProject = () => {
        // Создаем новый проект и добавляем его в хранилище
        const newProject: ProjectType = {
            projectId: generateUniqueTaskId(),
            title: newProjectTitle,
        };
        addProject(newProject);
        setNewProjectTitle('');

    };

    const handleDeleteProject = (projectId: number) => {
        // Удаляем проект по его ID
        deleteProject(projectId);
    };


    return (
        <div>
            <h1>Выберите проект</h1>
            <ul>
                {projects?.map((project) => (
                    <li
                        key={project.projectId}
                        onClick={() => selectProject(project)}
                        style={{
                            cursor: 'pointer',
                            fontWeight: selectedProject && selectedProject.projectId === project.projectId ? 'bold' : 'normal',
                        }}
                    >
                        {project.title}
                        <button onClick={() => handleDeleteProject(project.projectId)}>Удалить</button>
                    </li>
                ))}
            </ul>
            <div>
                <h2>Добавить новый проект</h2>
                <input
                    type="text"
                    value={newProjectTitle}
                    onChange={(e) => setNewProjectTitle(e.target.value)}
                    placeholder="Название проекта"
                />
                <button onClick={handleAddProject}>Добавить проект</button>
            </div>
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    selectedProject: state.tasks.selectedProject,
    projects: state.tasks.projects,
});

const mapDispatchToProps = {
    selectProject,
    addProject,
    deleteProject,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSelectionPage);
