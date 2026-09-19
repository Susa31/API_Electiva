import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import MealCard from "./components/MealCard";
import MealDetail from "./components/MealDetail";
import { StatusMessage } from "./components/StatusMessage";
import { FavoritesCounter } from "./components/FavoritesCounter";
import { useFavorites } from "./hooks/useFavorites";
import { listMeals } from "./services/api";
import type { Meal } from "./types/api";
import type { RequestState } from "./types/requestState";
import "./styles/style.css";

const SEARCH_DEBOUNCE_MS = 400;

function TheMealApp() {
  const [state, setState] = useState<RequestState<Meal[]>>({ status: "loading" });
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [selectedMealId, setSelectedMealId] = useState<string | null>(null);
  const { favorites, toggleFavorite } = useFavorites();

  // RF-03: debounce manual de 400 ms, con limpieza del temporizador.
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timeoutId);
  }, [searchInput]);

  // RF-01 / RF-02 / RF-06: carga el listado, cancelable y reintentable.
  useEffect(() => {
    const controller = new AbortController();

    setState({ status: "loading" });

    listMeals(controller.signal)
      .then((data) => {
        if (controller.signal.aborted) return;

        if (!data.meals || data.meals.length === 0) {
          setState({ status: "empty" });
        } else {
          setState({ status: "success", data: data.meals.slice(0, 20) });
        }
      })
      .catch((error) => {
        if (controller.signal.aborted) return;

        setState({
          status: "error",
          message: error instanceof Error ? error.message : "Error desconocido",
        });
      });

    return () => controller.abort();
  }, [retryCount]);

  const retry = () => setRetryCount((count) => count + 1);

  return (
    <main className="app">
      <header className="header">
        <h1>The Meal App</h1>
        <p>Explora nuestras comidas de la categoría Seafood</p>

        <SearchBar value={searchInput} onChange={setSearchInput} />
        <FavoritesCounter count={favorites.length} />
      </header>

      <StatusMessage
        state={state}
        onRetry={retry}
        renderSuccess={(meals) => {
          const filteredMeals = meals.filter((meal) =>
            meal.strMeal.toLowerCase().includes(debouncedSearch.toLowerCase())
          );

          if (filteredMeals.length === 0) {
            return <p className="message">No se encontraron comidas.</p>;
          }

          return (
            <section className="meals-container">
              {filteredMeals.map((meal) => (
                <MealCard
                  key={meal.idMeal}
                  meal={meal}
                  isFavorite={favorites.includes(meal.idMeal)}
                  onToggleFavorite={() => toggleFavorite(meal.idMeal)}
                  onSelect={() => setSelectedMealId(meal.idMeal)}
                />
              ))}
            </section>
          );
        }}
      />

      {selectedMealId && (
        <MealDetail
          mealId={selectedMealId}
          onClose={() => setSelectedMealId(null)}
        />
      )}
    </main>
  );
}

export default TheMealApp;