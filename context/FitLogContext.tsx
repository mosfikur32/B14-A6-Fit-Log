"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
};

type FitLogContextType = {
  plan: Workout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => {
    success: boolean;
    message: string;
  };
  addToSaved: (workout: Workout) => {
    success: boolean;
    message: string;
  };
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
};

const FitLogContext = createContext<FitLogContextType | undefined>(undefined);

export function FitLogProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Browser থেকে আগের Plan এবং Saved data load করবে
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog-plan");
      const storedSaved = localStorage.getItem("fitlog-saved");

      if (storedPlan) {
        setPlan(JSON.parse(storedPlan));
      }

      if (storedSaved) {
        setSaved(JSON.parse(storedSaved));
      }
    } catch {
      // LocalStorage data invalid হলে empty state থাকবে
    } finally {
      setHydrated(true);
    }
  }, []);

  // Plan localStorage-এ save করবে
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("fitlog-plan", JSON.stringify(plan));
    }
  }, [plan, hydrated]);

  // Saved localStorage-এ save করবে
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("fitlog-saved", JSON.stringify(saved));
    }
  }, [saved, hydrated]);

  // Today's Plan-এ workout যোগ করা
  const addToPlan = (workout: Workout) => {
    if (plan.length >= 5) {
      return {
        success: false,
        message: "Today's plan is full (5 lifts).",
      };
    }

    if (plan.some((item) => item.id === workout.id)) {
      return {
        success: false,
        message: "Already in today's plan.",
      };
    }

    setPlan((prev) => [...prev, workout]);

    return {
      success: true,
      message: "Added to today's plan.",
    };
  };

  // Saved list-এ workout যোগ করা
  const addToSaved = (workout: Workout) => {
    if (saved.some((item) => item.id === workout.id)) {
      return {
        success: false,
        message: "Already saved.",
      };
    }

    setSaved((prev) => [...prev, workout]);

    return {
      success: true,
      message: "Saved for later.",
    };
  };

  // Today's Plan থেকে workout remove করা
  const removeFromPlan = (id: number) => {
    setPlan((prev) => prev.filter((item) => item.id !== id));
  };

  // Saved list থেকে workout remove করা
  const removeFromSaved = (id: number) => {
    setSaved((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <FitLogContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  const context = useContext(FitLogContext);

  if (!context) {
    throw new Error("useFitLog must be used inside FitLogProvider");
  }

  return context;
}