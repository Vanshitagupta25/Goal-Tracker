"use client";
import { useGoals } from "../contexts/GoalContext";
import { Image, Target, Trash2 } from "lucide-react";

export default function Home() {
  const { goals, toggleGoalStatus, deleteGoal } = useGoals();

  return (
    <div className="max-w-6xl mx-auto mt-6 p-4">
      <h1 className="flex items-center justify-center text-4xl font-bold mb-6">
        🎯 Your Goals
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="bg-gray-900 p-5 rounded-xl shadow-lg hover:shadow-xl transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold">{goal.title}</h2>
                <span
                  className={`px-3 py-1 text-xs rounded-full ${
                    goal.completed
                      ? "bg-green-600 text-white"
                      : "bg-gray-700 text-gray-200"
                  }`}
                >
                  {goal.completed ? "Completed" : "Pending"}
                </span>
              </div>

              <p className="text-gray-300 mb-3">{goal.description}</p>

              {goal.image && (
                <img
                  src={goal.image}
                  alt="Goal proof"
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
              )}
            </div>

            <div className="flex items-center justify-between mt-3">
              <button
                onClick={() => toggleGoalStatus(goal.id)}
                className="px-3 py-1 text-sm rounded-md bg-blue-600 hover:bg-blue-700"
              >
                {goal.completed ? "Mark Pending" : "Mark Complete"}
              </button>
              <button
                onClick={() => deleteGoal(goal.id)}
                className="p-2 text-red-500 hover:bg-red-500/10 rounded-md transition"
                title="Delete goal"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Created: {new Date(goal.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {goals.length === 0 && (
        <div className="text-center py-10">
          <Target className="w-12 h-12 mx-auto text-gray-600 mb-2" />
          <h2 className="text-lg text-gray-400 mb-1">No goals yet</h2>
          <p className="text-gray-500 text-sm">
            Create your first goal to get started!
          </p>
        </div>
      )}
    </div>
  );
}