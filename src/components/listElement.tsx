import type { Meal } from "../types/api";

interface ListElementProps {
  meal: Meal;
}

function ListElement({ meal }: ListElementProps) {
  return (
    <article className="meal-card">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="meal-image"
      />

      <div className="meal-content">
        <span className="meal-id">
          ID: {meal.idMeal}
        </span>

        <h2>{meal.strMeal}</h2>

        <p>
          Categoría: Seafood
        </p>

        <button>
          Ver receta
        </button>
      </div>
    </article>
  );
}

export default ListElement;