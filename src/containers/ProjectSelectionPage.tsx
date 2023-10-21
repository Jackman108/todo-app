// src/components/ProjectSelectionPage.tsx
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { selectProject, addProject, deleteProject } from '../redux/actions/taskActions';
import { ProjectSelectionPageProps, ProjectType } from '../[types]/interface';
import generateUniqueId from '../helpers/generateUniqueId';
import ProjectList from '../components/Project/ProjectList';
import { useNavigate } from 'react-router-dom';

const ProjectSelectionPage: React.FC<ProjectSelectionPageProps> = ({
    projects,
    selectedProject,
    addProject,
    deleteProject
}) => {
    const [newProjectTitle, setNewProjectTitle] = useState('');
    const navigate = useNavigate();

    const handleAddProject = () => {
        // Создаем новый проект и добавляем его в хранилище
        const newProject: ProjectType = {
            projectId: generateUniqueId(),
            title: newProjectTitle,
        };
        addProject(newProject);
        setNewProjectTitle('');
    };

    const handleDeleteProject = (projectId: number) => {
        // Удаляем проект по его ID
        navigate(`/`);
        deleteProject(projectId);
    };

    const handleProjectClick = (projectId: number) => {
        navigate(`/tasks/${projectId}`);
    };

    return (
        <div>
            <h1>Выберите проект</h1>
            <ul>
                {projects?.map((project) => (
                    <li
                        key={project.projectId}

                        style={{
                            cursor: 'pointer',
                            fontWeight: selectedProject && selectedProject.projectId === project.projectId ? 'bold' : 'normal',
                        }}
                    ><div
                        onClick={() => handleProjectClick(project.projectId)}
                    >
                            <ProjectList projects={[project]} />
                        </div>
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
    selectedProject: state.projects.selectedProject,
    projects: state.projects.projects,
});

const mapDispatchToProps = {
    selectProject,
    addProject,
    deleteProject,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSelectionPage);
