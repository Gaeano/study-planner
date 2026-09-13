'use client';
import {useState, useEffect} from 'react';
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
const [tasks, setTasks] = useState<Task[]>([]);
const [sortOption, setSortOption] = useState('dueDateAsc');


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

 const sortedTasks = [...tasks].sort((a, b) => {
        if (a.isCompleted && !b.isCompleted) return 1;
        if (!a.isCompleted && b.isCompleted) return -1;

        if (sortOption === "dueDateAsc") {
            return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        } else if (sortOption === "dueDateDesc"){
            return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
        } else if (sortOption === 'subjectAsc'){
            return a.title.localeCompare(b.title);
        } else if (sortOption === 'subjectDesc'){
            return b.title.localeCompare(a.title);
        }

        return 0;
     });

return (
    <div className="min-h-screen flex bg-black text-white">
    <Sidebar />

    <main className="flex-1 p-10 animate-page-transition">
        <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
            Welcome back{username ? `, ${username}` : ''}!
        </h1>  
        </header>

        <div className="grid grid-cols-3 gap-6">
        <section className="col-span-2 bg-zinc-900 p-6 rounded-xl border border-zinc-800 min-h-[400px]">
            <h3 className="text-lg font-bold mb-4 text-purple-100">Active Tasks</h3>
            <div className="flex flex-col gap-2">
              {sortedTasks.length === 0 ? (
                <p className="text-zinc-500 italic">No active tasks. Click "+ New Task" to start planning!</p>
              ) : (
                sortedTasks.map((task) => (
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

    
    </div>
);
}