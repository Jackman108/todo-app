//TaskPage.tsx
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../redux/store/store';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'; // Импортируйте необходимые компоненты для drag-n-drop
import { editTask, changeTaskStatus } from '../redux/actions/taskActions'; // Замените на соответствующие действия
import TaskList from '../components/Tasks/TaskList';


const mapStateToProps = (state: RootState) => ({
    tasks: state.tasks.tasks,
});

const mapDispatchToProps = {
    editTask,
    changeTaskStatus,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
const TaskPage: React.FC<PropsFromRedux> = ({ tasks, editTask, changeTaskStatus }) => {
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
        editTask(movedTask.id, { ...movedTask, status: newStatus });
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
                                        >
                                            <TaskList tasks={[task]} />
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};




export default connect(mapStateToProps, mapDispatchToProps)(TaskPage);
