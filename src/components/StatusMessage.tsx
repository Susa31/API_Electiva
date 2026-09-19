import type { ReactNode } from "react";
import type { RequestState } from "../types/requestState";

interface Props<T> {
  state: RequestState<T>;
  renderSuccess: (data: T) => ReactNode;
  onRetry?: () => void;
}

export function StatusMessage<T>({ state, renderSuccess, onRetry }: Props<T>) {
  switch (state.status) {
    case "loading":
      return <p className="message">Cargando...</p>;

    case "error":
      return (
        <div className="error">
          <p>Error: {state.message}</p>
          {onRetry && (
            <button className="retry-button" onClick={onRetry}>
              Reintentar
            </button>
          )}
        </div>
      );

    case "empty":
      return <p className="message">Sin resultados</p>;

    case "success":
      return <>{renderSuccess(state.data)}</>;
  }
}