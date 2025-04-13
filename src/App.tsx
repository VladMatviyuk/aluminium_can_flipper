import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Menu } from '@/infrastructure/ui/pages/Menu';
import {
  ClassicGame,
  TimeGame,
  TurnsGame
} from '@/infrastructure/ui/pages/Games';

const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={ '/' } element={ <Menu/> }/>
          <Route path={ '/classicGame' } element={ <ClassicGame/> }/>
          <Route path={ '/timeGame' } element={ <TimeGame/> }/>
          <Route path={ '/turnsGame' } element={ <TurnsGame/> }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};


export default App;