import React from "react";
import Router from "./Routes/Routes";
import { BrowserRouter } from "react-router-dom";
import { InititalContextProvider } from "./store/store";
// import { AuthProvider } from "./hooks/AuthProvider";

import "./App.css";

function App() {
  return (
    <InititalContextProvider>
      {/* <AuthProvider> */}
      <div className="App">
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </div>
      {/* </AuthProvider> */}
    </InititalContextProvider>
  );
}

export default App;
