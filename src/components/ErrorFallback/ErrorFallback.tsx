import { useQueryClient } from "@tanstack/react-query";
import { FallbackProps } from "react-error-boundary";

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const queryClient = useQueryClient();
  return (
    <div role="alert" className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl p-2">Something went wrong</h1>
        <p className="text-xl text-red-600 mb-4 p-2">{error.message}</p>
        <button
          className="mt-4 p-2 bg-red-400 rounded"
          onClick={() => {
            resetErrorBoundary();
            queryClient.clear();
          }}
        >
          Reload page
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;
