import { BookForm, BookListController, BookList } from './feature/bookList/components';
import { useBookList } from './feature/bookList/hooks';

function App() {
  const { bookList, updatingBook, handleSubmit, handleEdit, handleDelete, filteredAndSortedBookList, handleSortAndFilter, sort, filter } = useBookList();
  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📚 読書ログ管理アプリ</h1>

      <BookForm onSubmit={handleSubmit} updatingBook={updatingBook} />
      <section className='mt-6'>
        <BookListController books={bookList} onSelect={handleSortAndFilter} sort={sort} filter={filter} />
      </section>
      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2">📖 登録済みの本</h2>
        <BookList books={filteredAndSortedBookList} onEdit={handleEdit} onDelete={handleDelete} />
      </section>
    </main>
  )
}

export default App
