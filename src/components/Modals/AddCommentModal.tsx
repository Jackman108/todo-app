// AddCommentModal.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../../redux/actions/taskActions';
import generateUniqueId from '../../helpers/generateUniqueId';

interface AddCommentModalProps {
    taskId: number;
    onClose: () => void;
}

const AddCommentModal: React.FC<AddCommentModalProps> = ({ taskId, onClose }) => {
    const dispatch = useDispatch();
    const [newComment, setNewComment] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewComment(e.target.value);
    };

    const handleAddComment = () => {
        if (newComment) {
            const comment = {
                id: generateUniqueId(),
                text: newComment,
            };
            dispatch(addComment(taskId, comment));
            setNewComment('');
            onClose();
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Добавить комментарий</h2>
                <textarea
                    value={newComment}
                    onChange={handleInputChange}
                    placeholder="Введите комментарий"
                />
                <button onClick={handleAddComment}>Добавить</button>
                <button onClick={onClose}>Отмена</button>
            </div>
        </div>
    );
};

export default AddCommentModal;
