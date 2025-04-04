import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useTheme } from '../contexts/theme-context'; 

// Componentes estilizados
const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
`;


const ListItem = styled.li`
  background-color: ${(props) => (props.theme === 'light' ? '#ffffff' : '#555555')};
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  color: ${(props) => (props.theme === 'light' ? '#333333' : '#ffffff')};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const PokemonLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  text-align: center;
`;

const PokemonImage = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
`;

const PokemonName = styled.span`
  font-size: 18px;
  font-weight: bold;
  text-transform: capitalize;
`;

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
