export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  // Propiedades opcionales que vienen en el detalle
  strCategory?: string;
  strArea?: string;
  strInstructions?: string;
}

export interface MealApiResponse {
  meals: Meal[] | null;
}