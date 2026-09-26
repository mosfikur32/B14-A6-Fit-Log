"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { useFitLog } from "../../../context/FitLogContext";
import { getWorkoutById } from "../../../lib/api";
import Footer from "../../../components/Footer";

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

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function WorkoutDetails({ params }: Props) {
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  const { addToPlan, addToSaved, plan, saved } = useFitLog();

  useEffect(() => {
    async function loadWorkout() {
      try {
        const { id } = await params;
        const data = await getWorkoutById(Number(id));
        setWorkout(data);
      } catch {
        setWorkout(null);
      } finally {
        setLoading(false);
      }
    }

    loadWorkout();
  }, [params]);

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast("");
    }, 2500);

    return () => clearTimeout(timer);
  }, [toast]);

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="container section-padding">
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--accent)]" />

              <p className="mt-5 text-sm uppercase tracking-[0.25em] text-[var(--muted)]">
                Loading workout...
              </p>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (!workout) {
    return (
      <>
        <Navbar />

        <main className="container section-padding">
          <div className="border border-[var(--border)] bg-[var(--surface)] p-10 text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-[var(--accent)]">
              WORKOUT NOT FOUND
            </p>

            <h1 className="display-font mt-3 text-4xl font-bold uppercase">
              This workout does not exist.
            </h1>

            <Link
              href="/"
              className="mt-8 inline-flex bg-[var(--accent)] px-6 py-3 text-sm font-bold uppercase text-black"
            >
              Back to workouts
            </Link>
          </div>
        </main>
      </>
    );
  }

  const isInPlan = plan.some((item) => item.id === workout.id);
  const isSaved = saved.some((item) => item.id === workout.id);
  const planFull = plan.length >= 5;

  const handleAddToPlan = () => {
    const result = addToPlan(workout);
    setToast(result.message);
  };

  const handleSave = () => {
    const result = addToSaved(workout);
    setToast(result.message);
  };

  return (
    <>
      <Navbar />

      <main className="container section-padding">
        <Link
          href="/"
          className="mb-8 inline-flex text-sm font-semibold uppercase tracking-wide text-[var(--muted)] transition hover:text-[var(--accent)]"
        >
          ← Back to library
        </Link>

        {/* Workout information */}
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="overflow-hidden border border-[var(--border)] bg-[var(--surface)]">
            {/* এখানে API-এর workout image ব্যবহার হচ্ছে */}
            <img
              src={workout.image}
              alt={workout.name}
              className="h-full min-h-[400px] w-full object-cover"
            />
          </div>

          <div>
            <div className="flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="border border-[var(--accent)] px-3 py-1 text-xs font-semibold uppercase text-[var(--accent)]"
                >
                  {muscle}
                </span>
              ))}
            </div>

            <h1 className="display-font mt-5 text-5xl font-bold uppercase leading-none sm:text-6xl">
              {workout.name}
            </h1>

            <p className="mt-6 leading-7 text-[var(--muted)]">
              {workout.description}
            </p>

            {/* Specs */}
            <div className="mt-8 grid grid-cols-2 border-y border-[var(--border)]">
              <div className="border-b border-r border-[var(--border)] p-4">
                <p className="text-xs uppercase text-[var(--muted)]">
                  Equipment
                </p>
                <p className="mt-1 text-sm font-semibold">
                  {workout.equipment}
                </p>
              </div>

              <div className="border-b border-[var(--border)] p-4">
                <p className="text-xs uppercase text-[var(--muted)]">
                  Difficulty
                </p>
                <p className="mt-1 text-sm font-semibold">
                  {workout.difficulty}
                </p>
              </div>

              <div className="border-b border-r border-[var(--border)] p-4">
                <p className="text-xs uppercase text-[var(--muted)]">
                  Sets
                </p>
                <p className="mt-1 text-sm font-semibold">{workout.sets}</p>
              </div>

              <div className="border-b border-[var(--border)] p-4">
                <p className="text-xs uppercase text-[var(--muted)]">
                  Reps
                </p>
                <p className="mt-1 text-sm font-semibold">{workout.reps}</p>
              </div>

              <div className="border-r border-[var(--border)] p-4">
                <p className="text-xs uppercase text-[var(--muted)]">
                  Duration
                </p>
                <p className="mt-1 text-sm font-semibold">
                  {workout.duration} min
                </p>
              </div>

              <div className="p-4">
                <p className="text-xs uppercase text-[var(--muted)]">
                  Calories
                </p>
                <p className="mt-1 text-sm font-semibold">
                  {workout.caloriesBurned} kcal
                </p>
              </div>
            </div>

            {/* Rating */}
            <div className="mt-5 flex items-center gap-2">
              <span className="text-[var(--accent)]">★</span>
              <span className="font-semibold">{workout.rating}</span>
              <span className="text-sm text-[var(--muted)]">
                workout rating
              </span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <section className="mt-16 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[var(--accent)]">
            HOW TO
          </p>

          <h2 className="display-font mt-3 text-4xl font-bold uppercase">
            INSTRUCTIONS
          </h2>

          <ol className="mt-8 space-y-5">
            {workout.instructions.map((instruction, index) => (
              <li
                key={index}
                className="flex gap-5 border-b border-[var(--border)] pb-5"
              >
                <span className="display-font text-2xl font-bold text-[var(--accent)]">
                  0{index + 1}
                </span>

                <p className="leading-7 text-[var(--muted)]">
                  {instruction}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Actions */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleAddToPlan}
            disabled={isInPlan || planFull}
            className={`px-7 py-4 text-sm font-bold uppercase tracking-wide transition ${
              isInPlan || planFull
                ? "cursor-not-allowed bg-[#252525] text-[#777]"
                : "bg-[var(--accent)] text-black hover:bg-[var(--accent-dark)]"
            }`}
          >
            {isInPlan
              ? "Already in today's plan"
              : planFull
                ? "Plan is full"
                : "Add to today's plan"}
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaved}
            className={`border px-7 py-4 text-sm font-bold uppercase tracking-wide transition ${
              isSaved
                ? "cursor-not-allowed border-[#333] text-[#666]"
                : "border-[var(--border)] text-white hover:border-[var(--accent)] hover:text-[var(--accent)]"
            }`}
          >
            {isSaved ? "Already saved" : "Save for later"}
          </button>
        </div>
      </main>
      <Footer />

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 border border-[var(--accent)] bg-[#111] px-6 py-4 text-sm font-semibold text-white shadow-2xl">
          <span className="mr-2 text-[var(--accent)]">✓</span>
          {toast}
        </div>
      )}
    </>
  );
}