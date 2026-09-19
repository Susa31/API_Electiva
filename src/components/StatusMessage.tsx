import type { RequestState, Meal } from "../types/requestState";

interface Props {
  state: RequestState;
  renderSuccess: (meals: Meal[]) => React.ReactNode;
  onRetry?: () => void;
}

export function StatusMessage({ state, renderSuccess, onRetry }: Props) {
  switch (state.status) {
    case "loading":
      return <p>Cargando...</p>;

    case "error":
      return (
        <div>
          <p>Error: {state.message}</p>
          {onRetry && <button onClick={onRetry}>Reintentar</button>}
        </div>
      );

    case "empty":
      return <p>Sin resultados</p>;

    case "success":
      return <>{renderSuccess(state.meals)}</>;
  }
}