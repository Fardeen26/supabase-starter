"use client";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

type Todo = {
  id: number;
  task: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState<string>("");

  useEffect(() => {
    fetchTodo();
  }, [])

  const fetchTodo = async () => {
    try {
      const { data, error } = await supabase
        .from("todos")
        .select("*");

      if (error) {
        console.error("Error fetching todos:", error.message);
        return;
      }

      if (data) {
        setTodos(data);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const addTodo = async () => {
    if (!task) return;
    try {
      const newTodo: Partial<Todo> = { task, completed: false };
      const { data, error } = await supabase
        .from("todos")
        .insert([newTodo])
        .select("*");

      if (error) {
        console.error("Error adding todo:", error.message);
        return;
      }

      if (data) {
        setTodos((prevTodos) => [...prevTodos, ...data]);
        setTask("");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const editTodo = async (id: number) => {
    try {
      const { data, error } = await supabase
        .from("todos")
        .update({ completed: true })
        .match({ id })
        .select("*");
      if (error) {
        console.error("Error updating todo:", error.message);
        return;
      }
      if (data) {
        setTodos((prevTodos) => prevTodos.map((todo) => todo.id === id ? data[0] : todo));
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }

  const deleteTodo = async (id: number) => {
    try {
      const { data, error } = await supabase
        .from("todos")
        .delete()
        .match({ id })
        .select("*");
      if (error) {
        console.error("Error deleting todo:", error.message);
        return;
      }
      if (data) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-center">Supabase Todo</h1>
      <div className="space-x-2">
        <input type="text" placeholder="Add Todo" className="text-black p-2" value={task} onChange={(e) => setTask(e.target.value)} />
        <button className="bg-blue-500 p-2 text-white" onClick={addTodo}>Add Todo</button>
      </div>
      <div>
        {todos.length > 0 ? (
          todos.map((todo) => (
            <div key={todo.id}>
              <h3>task: {todo.task}</h3>
              <p>status: {todo.completed ? "Completed" : "Not Completed"}</p>
              <div className="flex gap-2">
                <button className="bg-blue-500 p-2 text-white" onClick={() => editTodo(todo.id)}>{todo.completed ? "Marked" : "Mark"}</button>
                <button className="bg-blue-500 p-2 text-white" onClick={() => deleteTodo(todo.id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No todos yet.</p>
        )}
      </div>
    </div>
  );
}
