// App.tsx
import React from 'react';
import BookmarkForm from './components/BookmarkForm';
import BookmarkList from './components/BookmarkList';
import { useBookmarks } from './hooks/useBookmarks';

const App: React.FC = () => {
  const { bookmarks, handleEdit, updatingBookmark, handleSubmit } = useBookmarks();
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-8">
        <header className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">📌 ブックマーク管理アプリ</h1>
          <p className="text-sm text-gray-500">URLとメモを保存・編集・削除できます</p>
        </header>

        <section>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">🔖 ブックマーク追加 / 編集</h2>
          <BookmarkForm
            onSubmit={handleSubmit}
            updatingBookmark={updatingBookmark}
          />
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">📂 保存済みブックマーク</h2>
          <BookmarkList
            bookmarks={bookmarks}
            onEdit={handleEdit}
            onDelete={() => { /* TODO: 削除処理 */ }}
          />
        </section>
      </div>
    </div>
  );
};

export default App;
