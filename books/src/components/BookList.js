import { useContext } from 'react';

import BooksContext from '../context/books';
import BookShow from './BookShow';

export default function BookList({ books, onEdit, onDelete }) {
    const value = useContext(BooksContext);
    
    const renderedBooks = books.map((book) => {
        return <BookShow 
            key={book.id} 
            book={book} 
            onEdit={onEdit}
            onDelete={onDelete} />;
    });

    return <div className="book-list">
        {value}
        {renderedBooks}
    </div>;
}