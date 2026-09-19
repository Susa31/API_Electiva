interface BarraBusquedaProps {
  search: string;
  setSearch: (value: string) => void;
}

function BarraBusqueda({
  search,
  setSearch,
}: BarraBusquedaProps) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Buscar comida..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default BarraBusqueda;