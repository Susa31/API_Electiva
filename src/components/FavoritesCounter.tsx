interface Props {
  count: number;
}

export function FavoritesCounter({ count }: Props) {
  return <p className="favorites-counter">Favoritos guardados: {count}</p>;
}