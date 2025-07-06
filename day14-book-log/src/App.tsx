import { BookForm } from './components/BookForm';
import { BookList } from './components/BookList';
import { useBookList } from './hooks/useBookList';


function App() {
  const { bookList, updatingBook, handleSubmit, handleEdit, handleDelete } = useBookList();
  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📚 読書ログ管理アプリ</h1>

      <BookForm onSubmit={handleSubmit} updatingBook={updatingBook} />

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2">📖 登録済みの本</h2>
        <BookList books={bookList} onEdit={handleEdit} onDelete={handleDelete} />
      </section>
    </main>
  )
}

export default App
