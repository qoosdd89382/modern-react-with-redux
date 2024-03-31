import './index.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import BooksContext from './context/books';

const el = document.querySelector('#root');
const root = ReactDOM.createRoot(el);
root.render(
    <BooksContext.Provider value={5}>
        <App />
    </BooksContext.Provider>
);