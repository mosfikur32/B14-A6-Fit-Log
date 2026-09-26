import "./globals.css";
import { FitLogProvider } from "../context/FitLogContext";

export const metadata = {
  title: "FitLog — Workout Library",
  description:
    "FitLog is a dark, no-nonsense gym companion for planning and logging workouts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <FitLogProvider>{children}</FitLogProvider>
      </body>
    </html>
  );
}