import { Provider } from "react-redux";
import Routes from "./Routes/Routes";
import { store } from "./store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthUserProvider } from "./context/UserAuthContext";

import "./App.css";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 2,
        useErrorBoundary: true,
        staleTime: 10 * (60 * 1000), // 10 mins
        // In React Query, your data can be fresh or stale.
        // staleTime is the length of time before your data becomes stale
        cacheTime: 15 * (60 * 1000), // 15 mins
        // cacheTime is the length of time before inactive data gets removed from the cache
      },
    },
  });
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthUserProvider>
          <Routes />
        </AuthUserProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
}
export default App;
