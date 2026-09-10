'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Setup() {
  const router = useRouter();
  
  const [name, setName] = useState<string>('');
  const [focus, setFocus] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (name) {
      localStorage.setItem('planner_username', name);
    }
    
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl border border-zinc-800 shadow-xl shadow-purple-900/10">
        <h2 className="text-3xl font-bold mb-2">Let's get started</h2>
        <p className="text-zinc-400 mb-8">Tell us a little bit about yourself to personalize your planner.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
              What should we call you?
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex"
              required
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
            />
          </div>

          <div>
            <label htmlFor="focus" className="block text-sm font-medium text-zinc-300 mb-2">
              Primary study focus or major (Optional)
            </label>
            <input
              type="text"
              id="focus"
              value={focus}
              onChange={(e) => setFocus(e.target.value)}
              placeholder="e.g. Computer Science, SAT Prep"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-400 transition shadow-md"
          >
            Go to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}