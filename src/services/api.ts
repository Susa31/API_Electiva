import type { Meal, MealApiResponse } from "../types/api";

const CATEGORY = "Seafood";
const LIST_URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${CATEGORY}`;
const DETAIL_URL = "https://www.themealdb.com/api/json/v1/1/lookup.php";

export async function listMeals(signal?: AbortSignal): Promise<MealApiResponse> {
  const response = await fetch(LIST_URL, { signal });

  if (!response.ok) {
    throw new Error(`Error del servidor: ${response.status}`);
  }

  return response.json();
}

export async function getMealById(
  id: string,
  signal?: AbortSignal
): Promise<Meal | null> {
  const response = await fetch(
    `${DETAIL_URL}?i=${encodeURIComponent(id)}`,
    { signal }
  );

  if (!response.ok) {
    throw new Error(`Error del servidor: ${response.status}`);
  }

  const data: MealApiResponse = await response.json();
  return data.meals ? data.meals[0] : null;
}