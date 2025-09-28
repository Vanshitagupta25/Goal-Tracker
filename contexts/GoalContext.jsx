"use client";
import { createContext, useContext, useState, useEffect } from "react";

const GoalContext = createContext();

export function GoalProvider({ children }) {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const savedGoals = localStorage.getItem("goals");
    console.log("saved goals from localStorage", savedGoals);

    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    } else {

      setGoals([
        { 
          id: "1", 
          title: "Solve 5 LeetCode problems",
          description: "Daily practice to improve DSA skills.",
          status: "Completed",
          image: "/leetode.png",
          createdAt: new Date("2025-09-27"),
          completed: true
        },
        { 
          id: "2",
          title: "Submit weekly project task", 
          description: "Finish and submit before Sunday.",
          status: "Pending",
          image: null,
          createdAt: new Date("2025-09-27"),
          completed: false
        },
        { 
          id: "3",
          title: "Build Portfolio",
          description: "It's Showcase your work, skills, and achievements in a visually appealing way",
          status: "Pending",
          image: null,
          createdAt: new Date("2025-09-27"),
          completed: false
        },
         { 
          id: "4",
          title: "Build Zoom-clone",
          description: "Video conderencing platform with calls, screen sharing, and chat",
          status: "completed",
          image: "/zoom-clone.jpg",
          createdAt: new Date("2025-09-27"),
          completed: true
        },
      ]);
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  // Add a new goal
  const addGoal = (title, description, image = null) => {
    const newGoal = {
      id: Date.now().toString(),
      title,
      description,
      image: image ? URL.createObjectURL(image) : null,
      createdAt: new Date().toISOString(),
      completed: false,
      status: "Pending"
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const toggleGoalStatus = (id) => {
    setGoals(prev =>
      prev.map((goal) =>
        goal.id === id
          ? { 
              ...goal, 
              status: goal.status === "Pending" ? "Completed" : "Pending", 
              completed: !goal.completed 
            }
          : goal
      )
    );
  };

  // Delete a goal
  const deleteGoal = (id) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  return (
    <GoalContext.Provider value={{ 
      goals, 
      addGoal, 
      toggleGoalStatus, 
      deleteGoal 
    }}>
      {children}
    </GoalContext.Provider>
  );
}

export function useGoals() {
  const context = useContext(GoalContext);
  if (!context) {
    throw new Error("useGoals must be used within a GoalProvider");
  }
  return context;
}