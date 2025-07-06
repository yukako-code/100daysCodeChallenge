import { BookForm, BookListController, BookList } from './feature/bookList/components';
import { useBookListState, useBookListDisplay, useBookListActions } from './feature/bookList/hooks';

function App() {
  const { state, dispatch } = useBookListState();
  const { handleSubmit, handleDelete, handleEdit, handleFilter, handleSort } = useBookListActions(dispatch);
  const filteredAndSortedBookList = useBookListDisplay(state);

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📚 読書ログ管理アプリ</h1>

      <BookForm onSubmit={handleSubmit} updatingBook={state.updatingBook} />
      <section className='mt-6'>
        <BookListController books={state.bookList} onChangeFilter={handleFilter} onChangeSort={handleSort} sort={state.sort} filter={state.filter} />
      </section>
      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2">📖 登録済みの本</h2>
        <BookList books={filteredAndSortedBookList} onEdit={handleEdit} onDelete={handleDelete} />
      </section>
    </main>
  )
}

export default App
