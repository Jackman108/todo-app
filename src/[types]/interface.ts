export interface TaskType {
    id: number;
    title: string;
    description: string;
    subtasks: SubtaskType[];
    comments: CommentType[];
    status: string;
    creationDate: string;
    timeInWork: string;
    endDate: string;
    priority: string;
}
export interface SubtaskType {
    id: number;
    title: string;
    description: string;
}

export interface CommentType {
    id: number;
    text: string;
}
export interface ProjectType {
    projectId: number;
    title: string;
}
export interface TaskState {
    tasks: TaskType[];
    projects: ProjectType[];
}

export interface ProjectSelectionPageProps {
    projects: ProjectType[];
    selectedProject: ProjectType | null;
    selectProject: (project: ProjectType) => void;
    addProject: (newProject: ProjectType) => void; 
    deleteProject: (projectId: number) => void;
}