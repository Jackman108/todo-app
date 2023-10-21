//TaskPage.tsx
import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../redux/store/store';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'; // Импортируйте необходимые компоненты для drag-n-drop
import { addTask, editTask, changeTaskStatus } from '../redux/actions/taskActions'; // Замените на соответствующие действия
import TaskList from '../components/Tasks/TaskList';
import EditTaskModal from '../components/Modals/EditTaskModal';
import { ProjectType, TaskType } from '../[types]/interface';
import AddTaskModal from '../components/Modals/AddTaskModal';


const mapStateToProps = (state: RootState) => ({
    tasks: state.tasks.tasks,
    projects: state.projects.projects,
});
const mapDispatchToProps = {
    addTask,
    editTask,
    changeTaskStatus,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const TasksPage: React.FC<PropsFromRedux> = ({ 
    tasks, 
    projects, 
    addTask, 
    editTask, 
    changeTaskStatus 
}) => {

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);

    const onDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }

        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;

        // Перемещение задачи в соответствующую колонку
        const updatedTasks = [...tasks];
        const [movedTask] = updatedTasks.splice(sourceIndex, 1);
        updatedTasks.splice(destinationIndex, 0, movedTask);

        // Обновление статуса задачи
        const newStatus = result.destination.droppableId;
        changeTaskStatus(movedTask.id, newStatus);
    };

    const handleSelectProject = (project: ProjectType) => {
        setSelectedProject(project);
    };

    const handleOpenEditModal = (task: TaskType) => {
        setSelectedTask(task);
        setIsEditModalOpen(true);
    };
    // Function to close the AddTaskModal
    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };
    // Function to open the AddTaskModal
    const handleOpenAddTaskModal = () => {
        setIsAddTaskModalOpen(true);
    };

    // Function to close the AddTaskModal
    const handleCloseAddTaskModal = () => {
        setIsAddTaskModalOpen(false);
    };
    const handleAddTask = (newTask: TaskType) => {
        addTask(newTask); 
        setIsAddTaskModalOpen(false); 
    };
    return (
        <div>
            <h1>Задачи</h1>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="queue">
                    {(provided) => (
                        <ul {...provided.droppableProps} ref={provided.innerRef}>
                            {tasks.map((task, index) => (
                                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                    {(provided) => (
                                        <li
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            onDoubleClick={() => handleOpenEditModal(task)}
                                            onClick={
                                                () => handleSelectProject(task)
                                            }
                                        >
                                            <TaskList tasks={[task]}
                                            />
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
            {isEditModalOpen && selectedTask && (
                <EditTaskModal 
                task={selectedTask} 
                onClose={handleCloseEditModal} 
                />
            )}
            {isAddTaskModalOpen && (
                <AddTaskModal
                    projectId={selectedProject?.projectId || 0}
                    onClose={handleCloseAddTaskModal}
                    onAddTask={handleAddTask} 
                />
            )}

            <button onClick={handleOpenAddTaskModal}>Добавить задачу</button>

        </div>
    );
};




export default connect(mapStateToProps, mapDispatchToProps)(TasksPage);
