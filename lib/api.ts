const API_URL = "https://api.abcz.workers.dev/api/fitlog";

// সব workout-এর data নেওয়ার function
export async function getWorkouts() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }

  return response.json();
}

// নির্দিষ্ট workout-এর details নেওয়ার function
export async function getWorkoutById(id: number) {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Workout not found");
  }

  return response.json();
}