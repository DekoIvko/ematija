import Router from "./Routes/Routes";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./hooks/AuthProvider";
import { InitialContextProvider } from "./store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback/ErrorFallback";

import "./App.css";

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="App">
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.reload()}
      >
        <InitialContextProvider>
          <BrowserRouter>
            <AuthProvider>
              <QueryClientProvider client={queryClient}>
                <Router />
              </QueryClientProvider>
            </AuthProvider>
          </BrowserRouter>
        </InitialContextProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
