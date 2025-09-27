"use client";
import { createContext, useContext, useState, useEffect } from "react";

const GoalContext = createContext();

export function GoalProvider({ children }) {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const savedGoals = localStorage.getItem("goals");

    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    } else {

      setGoals([
        { 
          id: "1", 
          title: "Solve 5 LeetCode problems",
          description: "Daily practice to improve DSA skills.",
          status: "Pending",
          image: null,
          createdAt: new Date().toISOString(),
          completed: false
        },
        { 
          id: "2",
          title: "Submit weekly project task", 
          description: "Finish and submit before Sunday.",
          status: "Completed",
          image: null,
          createdAt: new Date().toISOString(),
          completed: true
        },
        { 
          id: "3",
          title: "Daily learn something new",
          description: "Explore a new concept, tool, or technique daily.",
          status: "Pending",
          image: null,
          createdAt: new Date().toISOString(),
          completed: false
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