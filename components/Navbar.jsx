import Link from "next/link";
import { Target } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 border-b border-gray-700 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          
          <Link href="/" className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors">
            <Target className="w-6 h-6 text-blue-400" />
            <span className="font-semibold text-lg">Goal Tracker</span>
          </Link>

          
          <div className="flex items-center gap-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors font-medium">
              Home
            </Link>
            <Link href="/add" className="text-gray-300 hover:text-white transition-colors font-medium">
              Add Goal
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}