interface Props {
  count: number;
}

export const FavoritesCounter = ({ count }: Props) => {
  return (
    <div style={{ padding: '10px', fontWeight: 'bold' }}>
      Saved favorites: {count}
    </div>
  );
};