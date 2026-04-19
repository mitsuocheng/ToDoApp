"use client";

import { useState, useRef } from "react";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addTodo = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: trimmed, done: false },
    ]);
    setInput("");
    inputRef.current?.focus();
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const remaining = todos.filter((t) => !t.done).length;

  return (
    <main className="min-h-screen flex items-start justify-center pt-16 px-4 pb-16">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-medium tracking-widest text-stone-400 uppercase mb-1">
            My Tasks
          </p>
          <h1 className="text-4xl font-bold text-stone-800 tracking-tight">
            ToDoリスト
          </h1>
          {todos.length > 0 && (
            <p className="mt-2 text-sm text-stone-400">
              残り{" "}
              <span className="font-semibold text-stone-600">{remaining}</span>{" "}
              件
            </p>
          )}
        </div>

        {/* Input */}
        <div className="flex gap-2 mb-8">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            placeholder="新しいタスクを入力…"
            className="flex-1 bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-700 placeholder-stone-300 outline-none focus:ring-2 focus:ring-stone-300 focus:border-transparent shadow-sm transition"
          />
          <button
            onClick={addTodo}
            className="bg-stone-800 hover:bg-stone-700 active:scale-95 text-white rounded-xl px-5 py-3 text-sm font-medium shadow-sm transition-all"
          >
            追加
          </button>
        </div>

        {/* Todo List */}
        {todos.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">✏️</p>
            <p className="text-stone-400 text-sm">
              タスクはまだありません。
              <br />
              上から追加してみましょう。
            </p>
          </div>
        ) : (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="group flex items-center gap-3 bg-white border border-stone-100 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Checkbox */}
                <button
                  onClick={() => toggleTodo(todo.id)}
                  aria-label={todo.done ? "未完了に戻す" : "完了にする"}
                  className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    todo.done
                      ? "bg-emerald-500 border-emerald-500"
                      : "border-stone-300 hover:border-emerald-400"
                  }`}
                >
                  {todo.done && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>

                {/* Text */}
                <span
                  className={`flex-1 text-sm leading-snug transition-all ${
                    todo.done
                      ? "line-through text-stone-300"
                      : "text-stone-700"
                  }`}
                >
                  {todo.text}
                </span>

                {/* Delete */}
                <button
                  onClick={() => deleteTodo(todo.id)}
                  aria-label="削除"
                  className="flex-shrink-0 opacity-0 group-hover:opacity-100 text-stone-300 hover:text-red-400 transition-all"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Clear completed */}
        {todos.some((t) => t.done) && (
          <button
            onClick={() => setTodos((prev) => prev.filter((t) => !t.done))}
            className="mt-6 w-full text-xs text-stone-400 hover:text-stone-600 transition-colors py-2"
          >
            完了済みをまとめて削除
          </button>
        )}
      </div>
    </main>
  );
}
