import { useState } from 'react';
import BookEdit from './BookEdit';

export default function BookShow({ book, onEdit, onDelete }) {
    const [ showEdit, setShowEdit ] = useState(false);

    const handleDeleteClick = () => {
        onDelete(book.id);
    };

    const handleEditClick = () => {
        setShowEdit(!showEdit);
    };

    const handleSubmit = (id, newTitle) => {
        onEdit(id, newTitle);
        setShowEdit(false);
    };


    const content = showEdit 
        ? <BookEdit book={book} onSubmit={handleSubmit} />
        : <h3>{book.title}</h3>;

    return <div className="book-show">
        <img alt="books" src={`https://picsum.photos/seed/${book.id}/300/200`} />
        {content}
        <div className="actions">
            <button className="edit" onClick={handleEditClick}>
                Edit
            </button>
            <button className="delete" onClick={handleDeleteClick}>
                Delete
            </button>
        </div>
    </div>;
}