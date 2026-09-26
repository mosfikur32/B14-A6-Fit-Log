"use client";

import Link from "next/link";

type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  duration: number;
  caloriesBurned: number;
  rating: number;
};

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden border border-[var(--border)] bg-[var(--surface)] transition hover:-translate-y-1 hover:border-[var(--accent)]"
    >
      {/* এখানে API থেকে আসা workout image ব্যবহার হচ্ছে */}
      <div className="aspect-[4/3] overflow-hidden bg-black">
        <img
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        {/* Muscle group tags */}
        <div className="mb-3 flex flex-wrap gap-2">
          {workout.muscleGroups?.map((muscle: string) => (
            <span
              key={muscle}
              className="border border-[var(--border)] px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--muted)]"
            >
              {muscle}
            </span>
          ))}
        </div>

        {/* Workout name */}
        <h3 className="display-font text-xl font-semibold uppercase tracking-wide text-white">
          {workout.name}
        </h3>

        {/* Equipment */}
        <p className="mt-2 text-sm text-[var(--muted)]">
          {workout.equipment}
        </p>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-3 border-t border-[var(--border)] pt-4">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[var(--muted)]">
              Duration
            </p>
            <p className="mt-1 text-sm font-semibold">
              {workout.duration} min
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-wider text-[var(--muted)]">
              Calories
            </p>
            <p className="mt-1 text-sm font-semibold">
              {workout.caloriesBurned}
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-wider text-[var(--muted)]">
              Rating
            </p>
            <p className="mt-1 text-sm font-semibold accent">
              ★ {workout.rating}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}