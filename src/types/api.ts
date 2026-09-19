export interface Meal {
    strMeal: string;
    strMealThumb: string;
    idMeal: string;
    strCountry: string;
};

export interface MealResponse {
    meals: Meal[];
}