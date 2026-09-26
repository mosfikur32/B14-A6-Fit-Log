"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import { useFitLog } from "../../context/FitLogContext";
import Footer from "../../components/Footer";

export default function MyPlan() {
  const {
    plan,
    saved,
    removeFromPlan,
    removeFromSaved,
  } = useFitLog();

  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");

  const activeItems = activeTab === "plan" ? plan : saved;

  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  return (
    <>
      <Navbar />

      <main className="container section-padding">
        {/* Header */}
        <div className="border-b border-[var(--border)] pb-10">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[var(--accent)]">
            YOUR WORKOUTS
          </p>

          <h1 className="display-font mt-3 text-5xl font-bold uppercase leading-none sm:text-6xl">
            MY PLAN
          </h1>

          <p className="mt-4 max-w-xl text-[var(--muted)]">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Metrics */}
        <div className="mt-8 grid border border-[var(--border)] sm:grid-cols-3">
          <div className="border-b border-[var(--border)] p-6 sm:border-b-0 sm:border-r">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
              Exercises
            </p>

            <p className="display-font mt-2 text-4xl font-bold text-[var(--accent)]">
              {plan.length}
            </p>
          </div>

          <div className="border-b border-[var(--border)] p-6 sm:border-b-0 sm:border-r">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
              Minutes
            </p>

            <p className="display-font mt-2 text-4xl font-bold">
              {totalMinutes}
            </p>
          </div>

          <div className="p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
              Calories
            </p>

            <p className="display-font mt-2 text-4xl font-bold">
              {totalCalories}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12 flex border-b border-[var(--border)]">
          <button
            type="button"
            onClick={() => setActiveTab("plan")}
            className={`px-5 py-4 text-sm font-bold uppercase tracking-wide transition ${
              activeTab === "plan"
                ? "border-b-2 border-[var(--accent)] text-[var(--accent)]"
                : "text-[var(--muted)] hover:text-white"
            }`}
          >
            Today&apos;s Plan ({plan.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("saved")}
            className={`px-5 py-4 text-sm font-bold uppercase tracking-wide transition ${
              activeTab === "saved"
                ? "border-b-2 border-[var(--accent)] text-[var(--accent)]"
                : "text-[var(--muted)] hover:text-white"
            }`}
          >
            Saved ({saved.length})
          </button>
        </div>

        {/* Workout List / Empty State */}
        <section className="mt-8">
          {activeItems.length === 0 ? (
            <div className="border border-[var(--border)] bg-[var(--surface)] px-6 py-16 text-center">
              <p className="display-font text-3xl font-bold uppercase">
                {activeTab === "plan"
                  ? "YOUR PLAN IS EMPTY"
                  : "NO SAVED WORKOUTS"}
              </p>

              <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[var(--muted)]">
                {activeTab === "plan"
                  ? "Browse the workout library and add your first lift to today&apos;s plan."
                  : "Save workouts from the library and they will appear here for later."}
              </p>

              <Link
                href="/"
                className="mt-7 inline-flex bg-[var(--accent)] px-6 py-4 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-[var(--accent-dark)]"
              >
                BROWSE WORKOUTS
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {activeItems.map((workout) => (
                <article
                  key={workout.id}
                  className="group grid overflow-hidden border border-[var(--border)] bg-[var(--surface)] md:grid-cols-[220px_1fr_auto]"
                >
                  {/* Image */}
                  <div className="h-52 overflow-hidden bg-black md:h-full">
                    {/* এখানে API থেকে আসা workout image ব্যবহার হচ্ছে */}
                    <img
                      src={workout.image}
                      alt={workout.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Information */}
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2">
                      {workout.muscleGroups.map((muscle) => (
                        <span
                          key={muscle}
                          className="border border-[var(--border)] px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--muted)]"
                        >
                          {muscle}
                        </span>
                      ))}
                    </div>

                    <h2 className="display-font mt-3 text-2xl font-bold uppercase">
                      {workout.name}
                    </h2>

                    <p className="mt-2 text-sm text-[var(--muted)]">
                      {workout.equipment}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-5 text-xs">
                      <span>
                        <span className="text-[var(--muted)]">Duration </span>
                        <strong>{workout.duration} min</strong>
                      </span>

                      <span>
                        <span className="text-[var(--muted)]">Calories </span>
                        <strong>{workout.caloriesBurned}</strong>
                      </span>

                      <span>
                        <span className="text-[var(--muted)]">Rating </span>
                        <strong className="text-[var(--accent)]">
                          ★ {workout.rating}
                        </strong>
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-row items-center gap-3 border-t border-[var(--border)] p-5 md:flex-col md:justify-center md:border-l md:border-t-0">
                    <Link
                      href={`/workout/${workout.id}`}
                      className="flex-1 border border-[var(--border)] px-4 py-3 text-center text-xs font-bold uppercase tracking-wide transition hover:border-[var(--accent)] hover:text-[var(--accent)] md:w-36 md:flex-none"
                    >
                      View Details
                    </Link>

                    {activeTab === "plan" ? (
                      <button
                        type="button"
                        onClick={() => removeFromPlan(workout.id)}
                        className="flex-1 border border-[var(--border)] px-4 py-3 text-xs font-bold uppercase tracking-wide text-[var(--muted)] transition hover:border-red-500 hover:text-red-400 md:w-36 md:flex-none"
                      >
                        Mark as Done
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => removeFromSaved(workout.id)}
                        className="flex-1 border border-[var(--border)] px-4 py-3 text-xs font-bold uppercase tracking-wide text-[var(--muted)] transition hover:border-red-500 hover:text-red-400 md:w-36 md:flex-none"
                      >
                        Remove
                      </button>
                    )}

                    {activeTab === "plan" && (
                      <button
                        type="button"
                        onClick={() => removeFromPlan(workout.id)}
                        className="px-3 py-3 text-lg text-[var(--muted)] transition hover:text-red-400"
                        aria-label={`Remove ${workout.name}`}
                      >
                        ×
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}