import React, { ReactElement } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import "./assets/styles/global.css";

import Facade from "./pages/facade";
import CharacterList from "./pages/charactersList";

function App(): ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Facade />} />
        <Route path="/list" element={<CharacterList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
