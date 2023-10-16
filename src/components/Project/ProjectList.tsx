// src/components/TaskList.tsx
import React from 'react';
import ProjectItem from './ProjectItem';
import { ProjectType } from '../../[types]/interface';

interface ProjectListProps {
    projects: ProjectType[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
    return (
        <div className="project-list">
            {projects.map((project) => (
                <ProjectItem key={project.projectId} project={project} /> 
            ))}
        </div>
    );
};

export default ProjectList;
