import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PokemonList from '../components/PokemonList';
import axios from 'axios';
import Button from '../components/StylizedButton';
import Input from '../components/StylizedInput';

// Componentes estilizados
const Container = styled.div`
  padding: 20px;
  text-align: center;
  color: ${(props) => (props.theme === 'light' ? '#000000' : '#ffffff')};
  max-width: 1200px;
  margin: 0 auto;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
  font-weight: bold;
  background-color: #ffe6e6;
  padding: 10px;
  border-radius: 5px;
`;

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [displayCount, setDisplayCount] = useState(10);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    const fetchPokemons = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`,
          { signal: controller.signal }
        );

        setPokemons((prev) => {
          const newPokemons = response.data.results.filter(
            (newPokemon) => 
              !prev.some((prevPokemon) => prevPokemon.url === newPokemon.url)
          );
          return [...prev, ...newPokemons];
        });

      } catch (error) {
        if (error.name !== 'CanceledError') {
          console.error("Erro ao buscar Pokémons:", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemons();

    return () => controller.abort();
  }, [offset]);

  const fetchPokemonsByType = async () => {
    setDisplayCount(10); // Reset display count on new search
    setError(''); // Reset error message
    if (type) {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
        const pokemonOfType = response.data.pokemon.map(p => p.pokemon);
        setFilteredPokemons(pokemonOfType);
        if (pokemonOfType.length === 0) {
          setError('Nenhum Pokémon encontrado para este tipo.');
        }
      } catch (error) {
        console.error("Erro ao buscar Pokémons por tipo:", error);
        setError('Tipo de Pokémon incorreto ou não encontrado, digite em inglês.');
      }
    } else {
      setFilteredPokemons([]);
    }
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchPokemonsByType();
    }
  };

  const handleLoadMore = () => {
    if (filteredPokemons.length > 0) {
      setDisplayCount((prev) => prev + 10);
    } else {
      setOffset((prev) => prev + 10);
    }
  };

  const displayedPokemons = filteredPokemons.length > 0 
    ? filteredPokemons.slice(0, displayCount) 
    : pokemons;

  return (
    <Container>
      <Input 
        type="text" 
        value={type} 
        onChange={handleTypeChange} 
        onKeyDown={handleKeyDown}
        placeholder="Digite o tipo de Pokémon" 
      />
      <Button onClick={fetchPokemonsByType}>Buscar</Button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <PokemonList pokemons={displayedPokemons} />
      <Button
        onClick={handleLoadMore}
        disabled={isLoading}
      >
        {isLoading ? 'Carregando...' : 'Carregar mais'}
      </Button>
    </Container>
  );
}

export default Home;