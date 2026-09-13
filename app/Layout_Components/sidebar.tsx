'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

export default function Sidebar(){

    const pathname = usePathname();

    return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800 p-6 flex flex-col gap-6">
        <h2 className="text-xl font-bold text-purple-600">Mini Study Planner</h2>
        <nav className="flex flex-col gap-4">
        <Link href="/dashboard" className={`font-medium ${pathname === '/dashboard' ? 'text-purple-500' : 'text-zinc-400 hover:text-purple-400'} transition`}>
            Dashboard
        </Link>
        <Link href="/tasks" className={`font-medium ${pathname === '/tasks' ? 'text-purple-500' : 'text-zinc-400 hover:text-purple-400'} transition`}>
            All Tasks
        </Link>
        <Link href="/pomodoro" className={`font-medium ${pathname === '/pomodoro' ? 'text-purple-500' : 'text-zinc-400 hover:text-purple-400'} transition`}>
            Pomodoro Timer
        </Link>
            </nav>
        </aside>
    );
}