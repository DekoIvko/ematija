import React, { useContext } from "react";
import Router from "./Routes/Routes";
import { InititalContextProvider, StateContext } from "./store/store";
import "./App.css";

function App() {
  const { state } = useContext(StateContext);
  return (
    <InititalContextProvider>
      <div
        className="App"
      >
        <Router />
      </div>
    </InititalContextProvider>
  );
}

export default App;
