import TaskList from "./TaskList";
import { useTasks } from "../hooks/useTasks";
import { useState } from "react";
/*TODO:
    core: useReducer + カスタムフック分離、永続化(localStorage) Done!
    optional: タグ/フィルタ/並び替え付きToDo
    advanced: Two Sumで重複タスク検出

*/
export default function TaskManager() {
    const [input, setInput] = useState('');
    const { tasks, isLoading, error, handleAddTask, handleDeleteTask } = useTasks();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleAddTask(input);
        setInput('');
    }
    return (
        <div className="min-h-screen bg-slate-50 flex justify-center">
            <main className="w-full max-w-xl p-6">
                {/* New Task Input */}
                <section className="bg-white rounded-xl shadow-sm p-4 mb-4">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        New Task
                    </label>
                    <form className="flex gap-2" onSubmit={handleSubmit}>
                        <input
                            className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Add a new task..."
                            value={input}
                            onChange={handleChange}
                        />
                        <button type="submit" className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white font-medium">
                            Add
                        </button>
                    </form>

                    {/* Optional: Tag / Priority Select */}
                    {/* <div className="flex gap-2 mt-3">
                        <select className="border rounded-lg px-2 py-1 text-xs text-slate-600">
                            <option>All tags</option>
                            <option>Work</option>
                            <option>Personal</option>
                        </select>
                        <select className="border rounded-lg px-2 py-1 text-xs text-slate-600">
                            <option>Normal</option>
                            <option>High</option>
                            <option>Low</option>
                        </select>
                    </div> */}
                </section>

                {/* Filters */}
                {/* <section className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex gap-2 text-xs">
                        <button className="px-3 py-1 rounded-full border border-slate-300 bg-white">
                            All
                        </button>
                        <button className="px-3 py-1 rounded-full border border-slate-300 bg-white">
                            Active
                        </button>
                        <button className="px-3 py-1 rounded-full border border-slate-300 bg-white">
                            Completed
                        </button>
                    </div>
                    <div className="flex gap-2 text-xs">
                        <select className="border rounded-full px-3 py-1 text-xs text-slate-600 bg-white">
                            <option>Sort: Created (newest)</option>
                            <option>Sort: Created (oldest)</option>
                            <option>Sort: Priority</option>
                        </select>
                    </div>
                </section> */}

                {/* 2. Task Stats */}
                {/* <section className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <span>3 tasks total • 1 completed</span>
                    <button className="underline">Clear completed</button>
                </section> */}
                {isLoading && (
                    <p className="text-sm text-blue-600 mb-3">Loading tasks...</p>
                )}
                {error && (
                    <p className="text-sm text-red-600 mb-3">Error: {error}</p>
                )}
                <TaskList tasks={tasks} onDelete={handleDeleteTask} />
            </main>
        </div>
    );
}
