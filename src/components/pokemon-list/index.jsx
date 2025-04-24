import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '../../contexts/theme-context'; 
import { List, ListItem, PokemonLink, PokemonImage, PokemonName } from './styles';

function PokemonList({ pokemons }) {
  const [detailedPokemons, setDetailedPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme(); 

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const promises = pokemons.map(async (pokemon) => {
          const response = await axios.get(pokemon.url);
          return response.data;
        });
        const results = await Promise.all(promises);
        setDetailedPokemons(results);
      } catch (error) {
        console.error("Erro ao buscar detalhes dos Pokémons:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [pokemons]);

  if (isLoading) return <div>Carregando...</div>;

  return (
    <List>
      {detailedPokemons.map((pokemon) => (
        <ListItem key={pokemon.id} theme={theme}>
          <PokemonLink to={`/pokemon/${pokemon.name}`}>
            {pokemon.sprites?.front_default && (
              <PokemonImage 
                src={pokemon.sprites.front_default} 
                alt={pokemon.name} 
              />
            )}
            <PokemonName>{pokemon.name}</PokemonName>
          </PokemonLink>
        </ListItem>
      ))}
    </List>
  );
}

export default PokemonList;
