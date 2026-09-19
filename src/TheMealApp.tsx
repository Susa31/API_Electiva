import { useEffect, useState } from "react";
import ListElement from "./components/listElement";
import { listMeals } from "./services/api";
import type { Meal } from "./types/api";
import "./styles/style.css";

function TheMealApp() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMeals = async () => {
      try {
        const data = await listMeals();

        if (data.meals) {
          setMeals(data.meals.slice(0, 20));
        } else {
          setMeals([]);
        }
      } catch (error) {
        console.error(error);
        setError("No se pudieron cargar las comidas.");
      } finally {
        setLoading(false);
      }
    };

    loadMeals();
  }, []);

  const filteredMeals = meals.filter((meal) =>
    meal.strMeal
      .toLowerCase()
    );

  return (
    <main className="app">

      <header className="header">
        <h1>The Meal App</h1>

        <p>
          Explora nuestras comidas de la categoría Seafood
        </p>

      </header>

      {loading && (
        <p className="message">
          Cargando comidas...
        </p>
      )}

      {error && (
        <p className="error">
          {error}
        </p>
      )}

      {!loading && !error && (
        <section className="meals-container">

          {filteredMeals.map((meal) => (
            <ListElement
              key={meal.idMeal}
              meal={meal}
            />
          ))}

        </section>
      )}

      {!loading &&
        !error &&
        filteredMeals.length === 0 && (
          <p className="message">
            No se encontraron comidas.
          </p>
        )}

    </main>
  );
}

export default TheMealApp ;