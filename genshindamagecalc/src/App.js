import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CharacterScreen, ArtifactScreen, EnvironmentScreen, SideBar, Home } from './components';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
  return (
    <div className="App" class="scrollbar">
      <Router>
        <SideBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/character/" element={<CharacterScreen />} />
          <Route path="/artifact/" element={<ArtifactScreen />} />
          <Route path="/environment/" element={<EnvironmentScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
