import { Provider } from "react-redux";
import Routes from "./Routes/Routes";
import { store } from "./store/store";
import buildProvidersTree from "./hooks/buildProvidersTree";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthUserProvider } from "./context/UserAuthContext";
import { useEffect } from "react";
import socket from "./socket";

import "./App.css";

const userLocalStorage = JSON.parse(
  window.localStorage.getItem("ematija-user")!
);

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

  // use composition instead of providers hell
  const ProvidersTree = buildProvidersTree([
    [Provider, { store: store }],
    [QueryClientProvider, { client: queryClient }],
    [AuthUserProvider],
  ]);

  useEffect(() => {
    if (!socket.connected) socket.connect();
    socket.emit("newUser", userLocalStorage);

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <ProvidersTree>
      <Routes />
      <ReactQueryDevtools initialIsOpen={false} />
    </ProvidersTree>
  );
}
export default App;
