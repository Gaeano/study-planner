'use client';
import {useState, useEffect} from 'react';
import TaskForm from '../Layout_Components/taskForm';
import TaskCard from '../Layout_Components/taskCard';
import Sidebar from '../Layout_Components/sidebar';

interface Task{
    id: string;
    title: string;
    subject: string;
    dueDate: string;
    isCompleted: boolean;
};
    
export default function Dashboard() {

const [username, setUsername] = useState<string>('');
const [isFormOpen, setFormOpen] = useState(false);
const [tasks, setTasks] = useState<Task[]>([]);
const [isCompleted, setCompleted] = useState(false);

useEffect(() => {
    const storedName = localStorage.getItem("planner_username");
    if (storedName){
        setUsername(storedName);
    }

    const savedTasks = localStorage.getItem("planner_tasks");
    if (savedTasks){
        setTasks(JSON.parse(savedTasks));
    }
}, []);

const handleAddTask = (newTaskData: {title: string; subject: string; dueDate: string}) =>{
    const newTask: Task ={
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
    const completedTasks = localStorage.getItem("planner_tasks");
    if (completedTasks){
        const updatedTasks = tasks.map((task) => {
            if (task.id === idToToggle){
                return {...task, isCompleted: !task.isCompleted};
            }
            return task;
        });
        setTasks(updatedTasks);
        localStorage.setItem("planner_tasks", JSON.stringify(updatedTasks));
        localStorage.setItem("planner_completed", JSON.stringify(updatedTasks.filter(task => task.isCompleted)));
    }
};

return (
    <div className="min-h-screen flex bg-black text-white">
    <Sidebar />

    <main className="flex-1 p-10">
        <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
            Welcome back{username ? `, ${username}` : ''}!
        </h1>  
        <button onClick={() => setFormOpen(true)} className="bg-purple-600 text-white px-5 py-2 rounded-md font-medium hover:bg-purple-400 transition shadow-sm" >
            + New Task
        </button>
        </header>

        <div className="grid grid-cols-3 gap-6">
        <section className="col-span-2 bg-zinc-900 p-6 rounded-xl border border-zinc-800 min-h-[400px]">
            <h3 className="text-lg font-bold mb-4 text-purple-100">Active Tasks</h3>
            <div className="flex flex-col gap-2">
              {tasks.length === 0 ? (
                <p className="text-zinc-500 italic">No active tasks. Click "+ New Task" to start planning!</p>
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

        </section>
        
        <section className="col-span-1 bg-zinc-900 p-6 rounded-xl border border-zinc-800 min-h-[400px]">
            <h3 className="text-lg font-bold mb-4 text-purple-100">Upcoming Schedule</h3>
            <p className="text-zinc-400 italic">Mini-calendar will render here...</p>
        </section>
        </div>
    </main>

    {isFormOpen && (
        <TaskForm
            onClose={() => setFormOpen(false)} 
            onAddTask={handleAddTask} />
    )};
    </div>
);
}