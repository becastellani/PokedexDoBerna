import axios from 'axios';
import { useState, useEffect } from 'react';

function PokemonSearch({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  async function handleSearch() {
    try {
      if (searchTerm) {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
        const pokemonData = response.data;
        onSearch([pokemonData]);
      } else {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=600');
        const pokemonUrls = response.data.results.map((pokemon) => pokemon.url);
        const pokemonData = await Promise.all(pokemonUrls.map(async (url) => {
          const response = await axios.get(url);
          return response.data;
        }));
        onSearch(pokemonData);
      }
    } catch (error) {
      console.error(error);
      onSearch([]);
    }
  }

  return (
    <form className='pokemon-search'>
      <div className='container'>
        <div className="row">
          <div className="col-md-6 mx-auto p-4 m-3">
            <h1 className='titulo-poke'>Pokédex do Berna</h1>
            <input
              type="text"
              className="form-control"
              placeholder="Procure pelo Pokémon ou número na Pokédex..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default PokemonSearch;
