import axios from 'axios';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './PokemonItem.css';
import PokemonSearch from './PokemonSearch';
Modal.setAppElement('#root');


function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    async function fetchPokemonList() {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=250');
      const pokemonUrls = response.data.results.map((pokemon) => pokemon.url);
      const pokemonData = await Promise.all(pokemonUrls.map(async (url) => {
        const response = await axios.get(url);
        return response.data;
      }));
      setPokemonList(pokemonData);
      setFilteredPokemonList(pokemonData);
    }
    fetchPokemonList();
  }, []);

  function handleSearch(results) {
    setFilteredPokemonList(results);
  }

  function handleClearSearch() {
    setFilteredPokemonList([]);
  }

  const openModal = (pokemon) => {
    setIsModalOpen(true);
    setSelectedPokemon(pokemon);
  };

  
  const closeModal = () => {
    setIsModalOpen(false);
  };
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


const cardStyles = {
  marginTop: '30px',
  width: '300px',
  height: '400px',
  padding: '10px',
  display: 'flex', 
  flexDirection: 'column', 
  alignItems: 'center', 
  borderRadius: '50px',
  background: '#e0e0e0',
  boxShadow: '1px 5px 50px 5px #ffffff',
};

  return (
    <div className=''>
          <PokemonSearch onSearch={handleSearch} onClear={handleClearSearch} />
            <ul className='pokemon-list' style={{listStyle: 'none'}}>
            {filteredPokemonList.map((pokemon, index) => (
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
                        <button onClick={() => openModal(pokemon)}>Saiba mais</button>
                    </li>
                </div>
                 ))}
            </ul>
                  
            <Modal
  isOpen={isModalOpen}
  onRequestClose={closeModal}
  style={{
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      borderRadius: '8px',
      width: '700px', // Largura do modal
      height: '600px',
    },
  }}
>
  
  {selectedPokemon && (
    <div className="modal-content">
            <div className="modal-header">
        <h2>{letraMaisucula(selectedPokemon.name)}</h2>
        <button onClick={closeModal}>X</button>
      </div>
      <div className="card" style={cardStyles}>
      <div className="pokemon-image">
        <img
          src={selectedPokemon.sprites.other['official-artwork'].front_default}
          alt={selectedPokemon.name}  style={{
            width: '150px',
            height: '150px', 
          }}
        />
      </div>
      <h2>{letraMaisucula(selectedPokemon.name)}</h2>

      <div className="types">
        <span className={`type-label ${selectedPokemon.types[0].type.name}`}>{letraMaisucula(selectedPokemon.types[0].type.name)}</span>
                          {selectedPokemon.types.length > 1 && (
                            <span className={`type-label ${selectedPokemon.types[1].type.name}`}>{letraMaisucula(selectedPokemon.types[1].type.name)}</span>
                          )}
      </div>
      <div className="description">
        <p>Descrição do Pokémon aqui.</p>
      </div>
      </div>
      <div className="moves">
        <h3>Movimentos:</h3>
        <div className="move-cards">
        {selectedPokemon.moves.slice(0, 4).map((move, index) => (
          <div key={index} className={`move-card ${move?.move?.type?.name || ''}`}>
            <h4>{move?.move?.name || 'Nome do Movimento Desconhecido'}</h4>
           
          </div>
        ))}
        </div>
      </div>
    </div>
  )}
</Modal>


    </div>
  );
}

export default PokemonList;
