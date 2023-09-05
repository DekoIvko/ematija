import React, { StrictMode } from "react";
import Router from "./Routes/Routes";
import "./App.css";

function App() {
  return (
    <div className="App">
      <StrictMode>
        <Router />
      </StrictMode>
    </div>
  );
}

export default App;
