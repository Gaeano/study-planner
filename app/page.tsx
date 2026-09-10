import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between p-6 bg-zinc-950 border-b border-zinc-800">
        <h1 className="text-2xl font-bold text-purple-600">Mini Study Planner</h1>
        <div className="space-x-4">
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center text-center px-6 py-32">
        <h2 className="text-5xl font-extrabold tracking-tight mb-6 text-white">
          Study Planner.<br /> Master your time.
        </h2>
        <p className="text-lg text-zinc-400 mb-10 max-w-2xl">
          A minimalist planner built to help you track assignments, manage your schedule, and hit your academic goals without the clutter.
        </p>
        <Link 
          href="/setup" 
          className="px-8 py-4 text-lg bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-400 transition shadow-md shadow-purple-900/20 hover:shadow-lg hover:shadow-purple-900/40"
        >
          Start Planning
        </Link>
      </main>
    </div>
  );
}