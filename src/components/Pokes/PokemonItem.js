import axios from 'axios';
import { useEffect, useState } from 'react';
import './PokemonItem.css'
import PokemonSearch from './PokemonSearch';

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);

  /*INPUT PESQUISA*/
  function handleSearch(results) {
    setPokemonList(results);
  }
  function handleClearSearch() {
    setPokemonList([]);
  }
  /*INPUT PESQUISA*/

  /*CHAMANDO API*/
  useEffect(() => {
    async function fetchPokemonList() {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=500');
      const pokemonUrls = response.data.results.map((pokemon) => pokemon.url);
      const pokemonData = await Promise.all(pokemonUrls.map(async (url) => {
        const response = await axios.get(url);
        return response.data;
      }));
      setPokemonList(pokemonData);
    }
    fetchPokemonList();

  }, []);

 /*CHAMANDO API*/


 /*DEIXADO COM UPPERCASE A PRIMEIRA LETRA DO NOME*/
  function letraMaisucula(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
/*DEIXADO COM UPPERCASE A PRIMEIRA LETRA DO NOME*/

/*CORES PARA OS NOMES*/
  function getTipos(types) {
    return types.map((type) => letraMaisucula(type.type.name)).join(', ');
  }
  const tipoCores = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
  };
  function getCorFundo(types){
    const type= types[0].type.name;
    return tipoCores[type]
  }
/*CORES PARA OS NOMES*/


  return (
    <div className=''>
          <PokemonSearch onSearch={handleSearch} onClear={handleClearSearch} />
            <ul className='pokemon-list' style={{listStyle: 'none'}}>
            {pokemonList.map((pokemon, index) => (
                <div className='pokemon-card' style={{listStyle: 'none'}}>
                    <li>
                        <h3 className='numeros'>#{String(pokemon.id).padStart(3, '0')}</h3>
                        <h2>{letraMaisucula(pokemon.name)}</h2>
                                    <span className={`type-label ${pokemon.types[0].type.name}`}>{letraMaisucula(pokemon.types[0].type.name)}</span>
                          {pokemon.types.length > 1 && (
                            <span className={`type-label ${pokemon.types[1].type.name}`}>{letraMaisucula(pokemon.types[1].type.name)}</span>
                          )}
                        <div className='pokemon-circle'
                        style={{backgroundColor: getCorFundo(pokemon.types)}}></div>
                        <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} className='imagem' />
                    </li>
                </div>
                 ))}
            </ul>
    </div>
  );
}

export default PokemonList;
