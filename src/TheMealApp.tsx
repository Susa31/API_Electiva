import { useEffect, useState } from "react";
import BarraBusqueda from "./components/BarraBusqueda";
import ListElement from "./components/listElement";
import { listMeals } from "./services/api";
import type { Meal } from "./types/api";
import "./styles/style.css";

// Importar tus nuevos componentes y hooks
import { MealDetail } from "./components/MealDetail";
import { FavoritesCounter } from "./components/FavoritesCounter";
import { useFavorites } from "./hooks/useFavorites";

function TheMealApp() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Nuevo estado para controlar si vemos el detalle o el listado
  const [selectedMealId, setSelectedMealId] = useState<string | null>(null);

  // Usar tu hook de favoritos para extraer la cantidad
  const { favorites } = useFavorites();

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
      .includes(search.toLowerCase())
  );

  return (
    <main className="app">
      <header className="header">
        <h1>The Meal App</h1>
        <p>Explora nuestras comidas de la categoría Seafood</p>

        {/* Renderizar tu contador de favoritos en la cabecera */}
        <FavoritesCounter count={favorites.length} />

        {/* Ocultar la barra de búsqueda si estamos viendo el detalle */}
        {!selectedMealId && (
          <BarraBusqueda
            search={search}
            setSearch={setSearch}
          />
        )}
      </header>

      {loading && <p className="message">Cargando comidas...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <>
          {/* Si hay un ID seleccionado, mostrar tu Detalle. Si no, mostrar el Listado */}
          {selectedMealId ? (
            <MealDetail
              idMeal={selectedMealId}
              onBack={() => setSelectedMealId(null)}
            />
          ) : (
            <>
              <section className="meals-container">
                {filteredMeals.map((meal) => (
                  <ListElement
                    key={meal.idMeal}
                    meal={meal}
                    // Le pasamos a la tarjeta la orden de abrir el detalle
                    onSelect={() => setSelectedMealId(meal.idMeal)}
                  />
                ))}
              </section>

              {filteredMeals.length === 0 && (
                <p className="message">No se encontraron comidas.</p>
              )}
            </>
          )}
        </>
      )}
    </main>
  );
}

export default TheMealApp;