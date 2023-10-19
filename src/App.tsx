// import { useState } from "react";
import Routes from "./Routes/Routes";
import { InitialContextProvider } from "./store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./App.css";

function App() {
  // const [queryClient] = useState(
  //   () =>
  //     new QueryClient({
  //       defaultOptions: {
  //         queries: {
  //           refetchOnWindowFocus: false,
  //           refetchOnMount: false,
  //           retry: 1,
  //           cacheTime: 1000 * 60 * 60 * 24, // 24 hours
  //         },
  //       },
  //     })
  // );
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: 1,
        cacheTime: 1000 * 60 * 60 * 24, // 24 hours
        staleTime: Infinity,
      },
    },
  });
  return (
    <InitialContextProvider>
      <QueryClientProvider client={queryClient}>
        <Routes />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </InitialContextProvider>
  );
}

export default App;
