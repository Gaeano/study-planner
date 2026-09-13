'use client';

import { useEffect, useState } from 'react';
import Sidebar from '../Layout_Components/sidebar';
import Timer from './timer';

const STORAGE_KEY = 'planner_timer';
const SAVED_TIMERS_KEY = 'planner_saved_timers';

export default function PomodoroPage() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [savedTimers, setSavedTimers] = useState<number[]>([]);

  useEffect(() => {
    const savedTimerState = localStorage.getItem(STORAGE_KEY);
    const savedTimersList = localStorage.getItem(SAVED_TIMERS_KEY);

    if (savedTimerState) {
      try {
        const parsed = JSON.parse(savedTimerState) as { timeLeft?: number };
        if (typeof parsed.timeLeft === 'number' && parsed.timeLeft >= 0) {
          setTimeLeft(parsed.timeLeft);
        }
      } catch (error) {
        console.error('Unable to restore timer state', error);
      }
    }

    if (savedTimersList) {
      try {
        const parsed = JSON.parse(savedTimersList) as number[];
        const validTimers = parsed.filter((timer) => typeof timer === 'number' && timer >= 0);
        setSavedTimers(validTimers);
      } catch (error) {
        console.error('Unable to restore saved timers list', error);
      }
    }
  }, []);

  const handleSaveTimer = () => {
    const currentTime = Math.max(timeLeft, 0);
    const updatedTimers = [currentTime, ...savedTimers.filter((timer) => timer !== currentTime)].slice(0, 6);

    setSavedTimers(updatedTimers);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ timeLeft: currentTime }));
    localStorage.setItem(SAVED_TIMERS_KEY, JSON.stringify(updatedTimers));
  };

  const handleResetTimer = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleRestoreSavedTimer = (timer: number) => {
    setIsRunning(false);
    setTimeLeft(timer);
  };

  return (
    <div className="min-h-screen flex bg-black text-white relative ">
      <Sidebar />

      <main className="flex-1 p-10 flex flex-col items-center justify-start animate-page-transition">
        <header className="w-full max-w-md flex justify-center items-center mb-8">
            <h1 className="text-3xl font-bold">Focus Timer</h1>
        </header>

        <Timer
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          isRunning={isRunning}
          setIsRunning={setIsRunning}
          onSaveTimer={handleSaveTimer}
          onResetTimer={handleResetTimer}
        />

        <section className="mt-8 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4 text-purple-100 text-center">Quick Presets</h3>
            <div className="grid grid-cols-3 gap-4">
                {savedTimers.length === 0 ? (
                Array.from({ length: 3 }).map((_, index) => (
                    <div
                        key={`empty-${index}`}
                        className="flex h-16 items-center justify-center rounded-xl border border-zinc-800 border-dashed bg-zinc-950/50 text-sm text-zinc-600"
                    >
                        Empty
                    </div>
                ))
                ) : (
                savedTimers.slice(0, 6).map((timer, index) => (
                    <button
                        key={`${timer}-${index}`}
                        type="button"
                        onClick={() => handleRestoreSavedTimer(timer)}
                        className="flex h-16 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 px-3 text-sm font-semibold text-zinc-100 shadow-sm hover:border-purple-500/50 hover:text-purple-400 transition"
                    >
                        {Math.floor(timer / 60).toString().padStart(2, '0')}:{(timer % 60).toString().padStart(2, '0')}
                    </button>
                ))
                )}
            </div>
        </section>
      </main>
    </div>
  );
}