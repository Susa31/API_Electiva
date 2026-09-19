import type { Meal } from '../types/api';
import { useFavorites } from '../hooks/useFavorites';

// 1. Agregamos onSelect a la interfaz para que TypeScript lo acepte
interface ListElementProps {
  meal: Meal;
  onSelect: () => void;
}

const ListElement = ({ meal, onSelect }: ListElementProps) => {
  // 2. Usamos tu hook para saber si esta receta está guardada y poder modificarla
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(meal.idMeal);

  return (
    <article className="card">
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      
      <div className="card-content">
        <p className="meal-id">ID: {meal.idMeal}</p>
        <h3>{meal.strMeal}</h3>
        <p>Categoría: {meal.strCategory || 'Seafood'}</p>
        
        <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
          {/* 3. Conectamos el botón de ver receta con onSelect */}
          <button 
            onClick={onSelect} 
            style={{ flex: 1, backgroundColor: '#ff7f50', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer' }}
          >
            Ver receta
          </button>

          {/* 4. Agregamos el botón para marcar/desmarcar favoritos */}
          <button 
            onClick={() => toggleFavorite(meal.idMeal)} 
            style={{ flex: 1, backgroundColor: isFavorite ? '#ffd700' : '#f0f0f0', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {isFavorite ? '★ Guardado' : '☆ Favorito'}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ListElement;