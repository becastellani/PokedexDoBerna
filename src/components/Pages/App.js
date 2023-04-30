import React, { useState } from 'react';
import NavBar from '../NavBar/index';
import PokemonList from '../Pokes/PokemonItem';

function App() {
  return (
    <div className="App">
      <NavBar />
      <PokemonList />
    </div>
  );
}

export default App;
