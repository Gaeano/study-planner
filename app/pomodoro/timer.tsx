'use client';

import { useEffect, useState } from 'react';

interface TimerProps {
    timeLeft: number;
    setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
    isRunning: boolean;
    setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
    onSaveTimer: () => void;
    onResetTimer: () => void;
}

export default function Timer({
    timeLeft,
    setTimeLeft,
    isRunning,
    setIsRunning,
    onSaveTimer,
    onResetTimer,
}: TimerProps) {
    const [editMode, setEditMode] = useState<'minutes' | 'seconds' | null>(null);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning, setTimeLeft]);

    useEffect(() => {
        if (timeLeft === 0) {
            setIsRunning(false);
        }
    }, [timeLeft, setIsRunning]);

    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const seconds = (timeLeft % 60).toString().padStart(2, '0');

    const handleEditSave = () => {
        let parsed = parseInt(inputValue, 10);
        if (isNaN(parsed)) parsed = 0;

        if (editMode === 'minutes') {
            setTimeLeft((parsed * 60) + parseInt(seconds, 10));
        } else if (editMode === 'seconds') {
            if (parsed > 59) parsed = 59;
            setTimeLeft((parseInt(minutes, 10) * 60) + parsed);
        }

        setEditMode(null);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleEditSave();
        }
    };

    return (
        <section className="bg-zinc-900 p-10 rounded-xl border border-zinc-800 flex flex-col items-center justify-center w-full max-w-md shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-purple-100">Current Session</h2>

            <div className="w-64 h-64 rounded-full border-8 border-zinc-800 flex items-center justify-center mb-6 relative bg-zinc-950 shadow-inner">
                <div className="flex items-center text-6xl font-bold text-white tracking-widest">
                    {editMode === 'minutes' ? (
                        <input
                            type="text"
                            autoFocus
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value.slice(0, 2))}
                            onBlur={handleEditSave}
                            onKeyDown={handleKeyDown}
                            className="w-20 bg-transparent text-center border-b-2 border-purple-500 focus:outline-none text-purple-400 placeholder:text-zinc-600"
                            placeholder="00"
                        />
                    ) : (
                        <span
                            onClick={() => {
                                setIsRunning(false);
                                setInputValue('');
                                setEditMode('minutes');
                            }}
                            className="cursor-pointer hover:text-purple-400 transition"
                            title="Edit minutes"
                        >
                            {minutes}
                        </span>
                    )}

                    <span className="mx-2 pb-2 text-zinc-500">:</span>

                    {editMode === 'seconds' ? (
                        <input
                            type="text"
                            autoFocus
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value.slice(0, 2))}
                            onBlur={handleEditSave}
                            onKeyDown={handleKeyDown}
                            className="w-20 bg-transparent text-center border-b-2 border-purple-500 focus:outline-none text-purple-400 placeholder:text-zinc-600"
                            placeholder="00"
                        />
                    ) : (
                        <span
                            onClick={() => {
                                setIsRunning(false);
                                setInputValue('');
                                setEditMode('seconds');
                            }}
                            className="cursor-pointer hover:text-purple-400 transition"
                            title="Edit seconds"
                        >
                            {seconds}
                        </span>
                    )}
                </div>
            </div>

            <div className="flex gap-4 mb-4">
                <button
                    onClick={() => setIsRunning(!isRunning)}
                    disabled={editMode !== null || timeLeft === 0}
                    className={`px-8 py-2 font-medium rounded-md transition
                        ${isRunning
                        ? 'bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700'
                        : 'bg-white text-black hover:bg-zinc-200'} disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    {isRunning ? 'Pause' : 'Start'}
                </button>
                <button
                    onClick={onResetTimer}
                    className="px-8 py-2 bg-zinc-800 text-white font-medium rounded-md hover:bg-zinc-700 transition border border-zinc-700 disabled:opacity-50"
                >
                    Reset
                </button>
            </div>

            <span className="text-xs text-zinc-500 mb-6">Click on the numbers to edit the timer.</span>

            <div className="flex flex-col items-center w-full">
                <button
                    onClick={onSaveTimer}
                    className="w-full py-2 bg-purple-600 text-white rounded-md font-medium hover:bg-purple-400 transition shadow-sm"
                >
                    Save as Preset
                </button>
            </div>
        </section>
    );
}