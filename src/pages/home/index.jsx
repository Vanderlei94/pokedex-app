import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PokemonList from '../../components/pokemon-list';
import axios from 'axios';
import Button from '../../components/stylized-button';
import Input from '../../components/stylized-input';
import { Container, ErrorMessage } from './styles';


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

  const fetchPokemonByNameOrType = async () => {
    setDisplayCount(10); 
    setError(''); 
    setFilteredPokemons([]);

    if (!type) return;
      
    try {
      // Primeiro, tenta buscar por nome
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${type.toLowerCase()}`);
    setFilteredPokemons([{ name: response.data.name, url: `https://pokeapi.co/api/v2/pokemon/${response.data.name}` }]);
  } catch (nameError) {
    try {
      // Se falhar, tenta por tipo
      const response = await axios.get(`https://pokeapi.co/api/v2/type/${type.toLowerCase()}`);
      const pokemonOfType = response.data.pokemon.map(p => p.pokemon);
      setFilteredPokemons(pokemonOfType);

      if (pokemonOfType.length === 0) {
        setError('Nenhum Pokémon encontrado para este tipo.');
      }
    } catch (typeError) {
      setError('Tipo ou Nome de Pokémon incorreto ou não encontrado, digite em inglês.');
    }
  }
};

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchPokemonByNameOrType();
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
      <Button onClick={fetchPokemonByNameOrType}>Buscar</Button>
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