"use client";
import { useGoals } from "../contexts/GoalContext";
import {Image, Target, Trash2} from "lucide-react";

export default function Home() {
  const { goals, toggleGoalStatus, deleteGoal} = useGoals();

  return (
    <div className="max-w-4xl mx-auto mt-4 p-4">
      <h1 className="flex items-center justify-center text-4xl font-bold text-balance mb-4">
        🎯 My Goals
      </h1>

      <div className="grid gap-4 md:grid-cols-2">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="bg-gray-900 p-4 rounded-lg shadow-lg hover:shadow-xl transition relative"
          >
            {/* delete button */}
            <button onClick={() => deleteGoal(goal.id)}className="absolute top-2 right-3 p-1 text-red-500 hover:bg-red-500/10 rounded-full transition"
              title="Delete goal">
            <Trash2 className="w-4 h-4" />
              </button>

             {/* Goal Image Proof */}
            {goal.image && (
              <div className="mb-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Image className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-gray-400">Proof Image:</span>
                </div>
                <img 
                  src={goal.image} 
                  alt="Goal proof" 
                  className="w-full h-32 object-cover rounded-md border border-gray-700"
                />
              </div>
            )}


            <h2 className="text-xl font-semibold mb-1">{goal.title}</h2>
            <p className="text-gray-300 mb-3">{goal.description}</p>

            <div className="flex items-center justify-between">
              <span
                className={`inline-block px-3 py-1 text-sm rounded-full ${
                  goal.completed
                    ? "bg-green-600 text-white"
                    : "bg-yellow-600 text-white"
                }`}
              >
                {goal.completed ? "Completed" : " In Progress"}
              </span>

              <button
                onClick={() => toggleGoalStatus(goal.id)}
                className="px-2 py-1 text-xs rounded-md bg-blue-600 hover:bg-blue-700"
              >
                {goal.completed ? "Mark Pending" : "Mark Completed"}
              </button>
            </div>
            <div className="mt-2 pt-2 border-t border-gray-700">
              <p className="text-xs text-gray-500">
                Created: {new Date(goal.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
      {/* for empty state */}
      {goals.length === 0 && (
        <div className="text-center py-8">
          <Target className="w-12 h-12 mx-auto text-gray-600 mb-2" />
          <h2 className="text-lg text-gray-400 mb-1">No goals yet</h2>
          <p className="text-gray-500 text-sm">Create your first goal to get started!</p>
        </div>
      )}
    </div>
  );
}
