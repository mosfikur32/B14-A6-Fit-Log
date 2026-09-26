import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080808] px-6">
      <div className="w-full max-w-2xl border border-[var(--border)] bg-[var(--surface)] p-10 text-center sm:p-16">
        <p className="display-font text-8xl font-bold leading-none text-[var(--accent)] sm:text-9xl">
          404
        </p>

        <p className="mt-6 text-sm font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
          PAGE NOT FOUND
        </p>

        <h1 className="display-font mt-3 text-4xl font-bold uppercase sm:text-5xl">
          This page doesn&apos;t exist.
        </h1>

        <p className="mx-auto mt-5 max-w-md leading-7 text-[var(--muted)]">
          The workout or page you are looking for could not be found.
          Head back to the workout library and keep training.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex bg-[var(--accent)] px-7 py-4 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-[var(--accent-dark)]"
        >
          Back to Workout Library
        </Link>
      </div>
    </main>
  );
}