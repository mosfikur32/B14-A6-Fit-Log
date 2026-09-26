"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFitLog } from "../context/FitLogContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useFitLog();

  const isWorkoutActive = pathname === "/";
  const isPlanActive = pathname === "/my-plan";

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[#080808]">
      <div className="container flex min-h-[76px] items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
        
        <img src="/logo.png"
        alt="FitLog Logo"
        className="h-10 w-auto"/>
        <span className="display-font text-2xl font-bold tracking-wide">
          FIT<span className="accent">LOG</span>
          </span>
          </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/#laibrary"
            className={`text-sm font-semibold uppercase tracking-wide transition ${
              isWorkoutActive
                ? "text-[var(--accent)]"
                : "text-white hover:text-[var(--accent)]"
            }`}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={`text-sm font-semibold uppercase tracking-wide transition ${
              isPlanActive
                ? "text-[var(--accent)]"
                : "text-white hover:text-[var(--accent)]"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Counters */}
        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-bold uppercase tracking-wide text-black transition hover:bg-[var(--accent-dark)]"
          >
            <span>Plan</span>
            <span>{plan.length}</span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 rounded-full border border-[var(--accent)] px-4 py-2 text-xs font-bold uppercase tracking-wide text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-black"
          >
            <span>Saved</span>
            <span>{saved.length}</span>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="border-t border-[var(--border)] md:hidden">
        <nav className="container flex items-center justify-center gap-8 py-3">
          <Link
            href="/#laibrary"
            className={`text-xs font-semibold uppercase tracking-wide ${
              isWorkoutActive
                ? "text-[var(--accent)]"
                : "text-white"
            }`}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={`text-xs font-semibold uppercase tracking-wide ${
              isPlanActive
                ? "text-[var(--accent)]"
                : "text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>
      </div>
    </header>
  );
}