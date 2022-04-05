import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Game from './pages/Game';
import Login from './pages/Login';
import Game from './pages/Game';

export default function App() {
  return (
    // <>
    //   <div className="App">
    //     <header className="App-header">
    //       <img src={ logo } className="App-logo" alt="logo" />
    //       <p>
    //         SUA  VEZ
    //       </p>
    //     </header>
    //   </div>
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/game" component={ Game } />
    </Switch>
    // </>
  );
}
