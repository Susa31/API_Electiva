import type { Meal } from "../types/api";

interface Props {
  meal: Meal;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onSelect: () => void;
}

function MealCard({ meal, isFavorite, onToggleFavorite, onSelect }: Props) {
  return (
    <article className="meal-card">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="meal-image"
      />

      <div className="meal-content">
        <span className="meal-id">ID: {meal.idMeal}</span>

        <h2>{meal.strMeal}</h2>

        <p>Categoría: Seafood</p>

        <div className="meal-actions">
          <button onClick={onSelect}>Ver receta</button>

          <button
            className={isFavorite ? "favorite-button active" : "favorite-button"}
            onClick={onToggleFavorite}
          >
            {isFavorite ? "★ Favorito" : "☆ Agregar a favoritos"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default MealCard;