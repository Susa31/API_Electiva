import type { MealApiResponse } from '../types/api';

const baseURL = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood";

export const listMeals = async (): Promise<MealApiResponse> => {
  const response = await fetch(baseURL);

  if (!response.ok) {
    throw new Error("Error al consultar la API");
  }

  const data: MealApiResponse = await response.json();
  return data;
};