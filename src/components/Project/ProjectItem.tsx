// src/components/TaskItem.tsx
import React from 'react';
import { ProjectType } from '../../[types]/interface';

interface ProjectItemProps {
    project: ProjectType;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
    return (
        <div className="project-item">
            <h1>Проект #{project.projectId}</h1>
            <h2>{project.title}</h2>
        </div>
    );
};

export default ProjectItem;
