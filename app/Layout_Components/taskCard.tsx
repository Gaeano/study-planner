import React from 'react';

interface TaskProps {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  isCompleted: boolean;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}



export default function TaskCard({ id, title, subject, dueDate, isCompleted, onDelete, onToggle }: TaskProps) {
  return (
    <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-lg flex items-center justify-between mb-3 shadow-sm hover:border-purple-500/50 transition group">
      <div className="flex items-center gap-4">
        <button onClick={() => onToggle(id)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition
            ${isCompleted ? 'bg-purple-600 border-purple-600' : 'border-zinc-600 hover:border-purple-400'}`}
        >
          {isCompleted && <span className="text-white text-xs">✓</span>}
        </button>
        
        <div>
          <h4 className={`font-semibold ${isCompleted ? 'text-zinc-500 line-through' : 'text-zinc-100'}`}>
            {title}
          </h4>
          <p className="text-xs text-zinc-400 mt-1">{subject}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-xs px-2 py-1 bg-zinc-900 text-zinc-300 rounded-md border border-zinc-800">
          {dueDate}
        </div>
        
        <button 
          onClick={() => onDelete(id)}
          className="text-zinc-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Delete task"
        >
          ✕
        </button>
      </div>
    </div>
  );
}