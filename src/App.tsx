import React from "react";
import Router from "./Routes/Routes";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./hooks/AuthProvider";
import { InitialContextProvider } from "./store/store";

import "./App.css";

function App() {
  return (
    <div className="App">
      <InitialContextProvider>
        <BrowserRouter>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </BrowserRouter>
      </InitialContextProvider>
    </div>
  );
}

export default App;
