export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
  strInstructions?: string;
}

export type RequestState =
  | { status: "loading" }
  | { status: "success"; meals: Meal[] }
  | { status: "empty" }
  | { status: "error"; message: string };