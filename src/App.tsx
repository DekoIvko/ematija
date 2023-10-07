import Routes from "./Routes/Routes";
import { InitialContextProvider } from "./store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";

function App() {
  const queryClient = new QueryClient();
  return (
    <InitialContextProvider>
      <QueryClientProvider client={queryClient}>
        <Routes />
      </QueryClientProvider>
    </InitialContextProvider>
  );
}

export default App;
