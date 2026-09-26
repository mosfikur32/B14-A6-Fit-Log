export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[#080808]">
      <div className="container flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <div className="flex items-center gap-2">
          <img src="/logo.png"
          alt="FitLog Logo"
          className="h-8 w-auto"/>
          <span className="display-font text-xl font-bold tracking-wide">
            FIT<span className="accent">LOG</span>
            </span>
            </div>

        <p className="text-center text-xs uppercase tracking-wider text-[var(--muted)]">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}