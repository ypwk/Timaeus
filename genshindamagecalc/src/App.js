import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CharacterScreen, InventoryScreen, EnvironmentScreen, SideBar, Home } from './components';
import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import storageUtils from "./utils/storageUtils";

function App() {
  const storageHelper = new storageUtils();
  storageHelper.fetchData(() => {
    
  });
  return (
    <div className="App" class="scrollbar">
      <Router>
        <SideBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/character/" element={<CharacterScreen storageUtil={storageHelper}/>} />
          <Route path="/artifact/" element={<InventoryScreen storageUtil={storageHelper}/>} />
          <Route path="/environment/" element={<EnvironmentScreen storageUtil={storageHelper}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
