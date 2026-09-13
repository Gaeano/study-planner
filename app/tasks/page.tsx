'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import TaskForm from '../Layout_Components/taskForm';
import TaskCard from '../Layout_Components/taskCard';
import Sidebar from '../Layout_Components/sidebar';

interface Task {
    id: string;
    title: string;
    subject: string;
    dueDate: string;
    isCompleted: boolean;
}

export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isFormOpen, setFormOpen] = useState(false);

    useEffect(() => {
        const savedTasks = localStorage.getItem("planner_tasks");
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    const handleAddTask = (newTaskData: { title: string; subject: string; dueDate: string }) => {
        const newTask: Task = {
            id: crypto.randomUUID(),
            title: newTaskData.title,
            subject: newTaskData.subject,
            dueDate: newTaskData.dueDate,
            isCompleted: false
        };

        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        localStorage.setItem("planner_tasks", JSON.stringify(updatedTasks));
    };

    const handleDeleteTask = (idToDelete: string) => {
        const updatedTasks = tasks.filter((task) => task.id !== idToDelete);
        setTasks(updatedTasks);
        localStorage.setItem("planner_tasks", JSON.stringify(updatedTasks));
    };

    const handleToggleComplete = (idToToggle: string) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id === idToToggle) {
                return { ...task, isCompleted: !task.isCompleted };
            }
            return task;
        });

        setTasks(updatedTasks);
        localStorage.setItem("planner_tasks", JSON.stringify(updatedTasks));
    };

    return (
        <div className="min-h-screen flex bg-black text-white relative">
           <Sidebar />
            <main className="flex-1 p-10 flex flex-col items-center animate-page-transition">
                
                <header className="w-full max-w-2xl flex flex-col items-center text-center mb-10 gap-6">
                    <h1 className="text-4xl font-bold">Tasks</h1>
                    <p className="text-zinc-400">Manage, edit, and organize all your study materials in one place.</p>
                    <button 
                        onClick={() => setFormOpen(true)} 
                        className="bg-purple-600 text-white px-8 py-3 rounded-md font-medium hover:bg-purple-400 transition shadow-md hover:shadow-lg"
                    >
                        + New Task
                    </button>
                </header>

                <div className="w-full max-w-2xl bg-zinc-900 p-8 rounded-xl border border-zinc-800 min-h-[400px]">
                    <div className="flex flex-col gap-3">
                        {tasks.length === 0 ? (
                            <div className="text-center py-10">
                                <p className="text-zinc-500 italic mb-2">Your task list is completely empty.</p>
                                <p className="text-zinc-600 text-sm">Click the button above to start organizing your studies!</p>
                            </div>
                        ) : (
                            tasks.map((task) => (
                                <TaskCard 
                                    key={task.id}
                                    id={task.id}
                                    title={task.title}
                                    subject={task.subject}
                                    dueDate={task.dueDate}
                                    isCompleted={task.isCompleted}
                                    onDelete={handleDeleteTask}
                                    onToggle={handleToggleComplete}
                                />
                            ))
                        )}
                    </div>
                </div>
            </main>

            {isFormOpen && (
                <TaskForm
                    onClose={() => setFormOpen(false)} 
                    onAddTask={handleAddTask} 
                />
            )}
        </div>
    );
}