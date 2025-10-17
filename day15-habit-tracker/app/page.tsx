'use client';

import HabitForm from "../components/HabitForm";
import HabitList from "../components/HabitList";

export default function Home() {
  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">🌱 習慣トラッカー</h1>
      <HabitForm />
      <HabitList />
      <div className="mt-4 text-center text-sm text-gray-600">
        ✅ 今日の習慣 1/3 達成！
      </div>
    </div>
  );
}
