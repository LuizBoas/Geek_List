import React, { ReactElement } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import "./assets/styles/global.css";

import Facade from "./pages/facade";
import CharacterList from "./pages/charactersList";
import CharacterDetails from "./pages/characterDetails";

function App(): ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Facade />} />
        <Route path="/list" element={<CharacterList />} />
        <Route path="/personagem/:id" element={<CharacterDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
