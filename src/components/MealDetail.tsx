import { useEffect, useState } from "react";
import { getMealById } from "../services/api";
import type { Meal } from "../types/api";
import type { RequestState } from "../types/requestState";
import { StatusMessage } from "./StatusMessage";

interface Props {
  mealId: string;
  onClose: () => void;
}

function MealDetail({ mealId, onClose }: Props) {
  const [state, setState] = useState<RequestState<Meal>>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();

    setState({ status: "loading" });

    getMealById(mealId, controller.signal)
      .then((meal) => {
        if (controller.signal.aborted) return;
        setState(meal ? { status: "success", data: meal } : { status: "empty" });
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        setState({
          status: "error",
          message: error instanceof Error ? error.message : "Error desconocido",
        });
      });

    return () => controller.abort();
  }, [mealId]);

  return (
    <div className="meal-detail-overlay">
      <div className="meal-detail">
        <button className="close-button" onClick={onClose}>
          ← Volver al listado
        </button>

        <StatusMessage
          state={state}
          renderSuccess={(meal) => (
            <>
              <h2>{meal.strMeal}</h2>
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="meal-detail-image"
              />
              <p>
                <strong>Categoría:</strong> {meal.strCategory ?? "N/D"}
              </p>
              <p>
                <strong>Origen:</strong> {meal.strArea ?? "N/D"}
              </p>
              <p className="meal-instructions">
                {meal.strInstructions ?? "Sin instrucciones disponibles."}
              </p>
            </>
          )}
        />
      </div>
    </div>
  );
}

export default MealDetail;