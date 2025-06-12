import React from "react";
import { ThemeProvider } from "../src/context/ThemeProvider";
import ToDo from "./components/ToDo";

const App = () => {
  return (
    <>
      <ThemeProvider>
        <ToDo />
      </ThemeProvider>
    </>
  );
};

export default App;
