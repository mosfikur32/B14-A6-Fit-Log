"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import WorkoutCard from "../components/WorkoutCard";
import { getWorkouts } from "../lib/api";
import Footer from "../components/Footer";

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

type SortOption = "duration" | "calories" | "rating";

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const data = await getWorkouts();
        setWorkouts(data);
      } catch {
        setError("Unable to load workouts. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === "duration") {
      return a.duration - b.duration;
    }

    if (sortBy === "calories") {
      return b.caloriesBurned - a.caloriesBurned;
    }

    return b.rating - a.rating;
  });

  return (
    <>
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[var(--border)]">
          <div className="container grid min-h-[620px] items-center gap-12 py-20 lg:grid-cols-2">
            <div className="max-w-2xl">
              <p className="mb-5 text-sm font-bold uppercase tracking-[0.25em] text-[var(--accent)]">
                WORKOUT LIBRARY
              </p>

              <h1 className="display-font text-5xl font-bold uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                TRAIN WITH INTENT.
                <br />
                LOG EVERY SET.
              </h1>

              <p className="mt-7 max-w-xl text-base leading-7 text-[var(--muted)] sm:text-lg">
                FitLog is a dark, no-nonsense gym companion: pick a lift,
                lock it into today&apos;s plan, and watch the week&apos;s work
                add up.
              </p>

              <button
  type="button"
  onClick={() => {
    document.getElementById("library")?.scrollIntoView({
      behavior: "smooth",
    });
  }}
  className="mt-9 inline-flex items-center gap-3 bg-[var(--accent)] px-6 py-4 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-[var(--accent-dark)]"
>
  BROWSE WORKOUTS
  <span className="text-lg">↓</span>
</button>
            </div>

            <div className="relative flex min-h-[380px] items-center justify-center lg:min-h-[500px]">
              {/* এখানে assets folder-এর Hero Banner/Image-এর আসল filename বসাবে */}
              <div className="relative flex h-full min-h-[380px] w-full items-center justify-center overflow-hidden lg:min-h-[500px]">
                <img src="/banner.png"
                alt="FitLog Workout Banner"
                className="h-full w-full object-cover"/>
              </div>
            </div>
          </div>
        </section>

        {/* Library */}
        <section id="library" className="section-padding">
          <div className="container">
            <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-[var(--accent)]">
                  WORKOUTS
                </p>

                <h2 className="display-font mt-3 text-4xl font-bold uppercase sm:text-5xl">
                  THE LIBRARY
                </h2>

                <p className="mt-3 max-w-xl text-[var(--muted)]">
                  Twelve lifts covering every major muscle group.
                </p>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-3">
                <label
                  htmlFor="sort"
                  className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]"
                >
                  Sort by
                </label>

                <select
                  id="sort"
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(event.target.value as SortOption)
                  }
                  className="border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm font-semibold text-white outline-none transition focus:border-[var(--accent)]"
                >
                  <option value="duration">Duration</option>
                  <option value="calories">Calories</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>

            {/* Loading */}
            {loading && (
              <div className="flex min-h-[300px] items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--accent)]" />

                  <p className="mt-5 text-sm uppercase tracking-[0.25em] text-[var(--muted)]">
                    Loading workouts...
                  </p>
                </div>
              </div>
            )}

            {/* Error */}
            {!loading && error && (
              <div className="border border-[var(--border)] bg-[var(--surface)] px-6 py-16 text-center">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-[var(--accent)]">
                  SOMETHING WENT WRONG
                </p>

                <p className="mt-4 text-[var(--muted)]">{error}</p>

                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="mt-7 bg-[var(--accent)] px-6 py-3 text-sm font-bold uppercase text-black transition hover:bg-[var(--accent-dark)]"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Workout Cards */}
            {!loading && !error && (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {sortedWorkouts.map((workout) => (
                  <WorkoutCard key={workout.id} workout={workout} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}