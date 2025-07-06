import type { Book } from "../types";

type BookItemProps = {
    book: Book;
    onEdit: (book: Book) => void;
    onDelete: (id: Book['id']) => void;

}
const BookItem: React.FC<BookItemProps> = ({ book, onEdit, onDelete }) => {
    return (
        <li className="p-2 border rounded flex justify-between">
            <div>
                <p className="font-bold">{book.title}</p>
                <p className="text-sm">{book.author} - {book.status}</p>
            </div>
            <div className="flex gap-2">
                <button onClick={() => onEdit(book)}>✏️</button>
                <button onClick={() => onDelete(book.id)}>🗑️</button>
            </div>
        </li>
    );
};

type BookListProps = {
    books: Array<Book>;
    onEdit: (book: Book) => void;
    onDelete: (id: Book['id']) => void;
}
export const BookList: React.FC<BookListProps> = ({ books, onEdit, onDelete }) => {
    return (
        <ul className="space-y-2">
            {books.map((book) => <BookItem key={book.id} book={book} onEdit={onEdit} onDelete={onDelete} />)}
        </ul>

    );
};
