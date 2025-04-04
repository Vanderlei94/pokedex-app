import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchPokemonDetails, fetchAbilityDescription } from '../services/api';
import { useTheme } from '../contexts/theme-context';
import Button from './StylizedButton';

// Componentes estilizados
const Container = styled.div`
  padding: 20px;
  text-align: center;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  color: ${(props) => (props.theme === 'light' ? '#000000' : '#ffffff')};
`;

const PokemonName = styled.h1`
  color: ${(props) => (props.theme === 'light' ? '#333' : '#ffffff')};
  text-transform: capitalize;
  margin-bottom: 20px;
  margin-right: 30px;
`;

const PokemonImage = styled.img`
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  color: #007bff;
  margin-top: 20px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 10px auto;
  max-width: 300px;
`;

const ListMoviment = styled.ul`
  list-style: none;
  margin: 10px auto;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
`;

const ListItem = styled.li`
  background-color: ${(props) => (props.theme === 'light' ? '#f0f0f0' : '#444444')};
  margin: 5px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: ${(props) => (props.theme === 'light' ? '#000000' : '#ffffff')};
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.theme === 'light' ? '#e0e0e0' : '#555555'};
  }
`;

const AbilityDescription = styled.span`
  display: block;
  font-size: 14px;
  margin-top: 5px;
`;

const LoadMoreButton = styled(Button)`
  margin-top: 15px;
`;

function PokemonDetail() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [abilities, setAbilities] = useState([]);
  const { theme } = useTheme();

  const [visibleMoves, setVisibleMoves] = useState(10); // Inicia com 10 movimentos

  useEffect(() => {
    const fetchData = async () => {
      const pokemonData = await fetchPokemonDetails(name);
      if (pokemonData) {
        setPokemon(pokemonData);

        const abilitiesPromises = pokemonData.abilities.map(async (ability) => {
          const description = await fetchAbilityDescription(ability.ability.url);
          return { name: ability.ability.name, description };
        });

        const abilitiesWithDescriptions = await Promise.all(abilitiesPromises);
        setAbilities(abilitiesWithDescriptions);
      }
    };

    fetchData();
  }, [name]);

  if (!pokemon) return <Container theme={theme}>Carregando...</Container>;

  return (
    <Container theme={theme}>
      <PokemonName theme={theme}>{pokemon.name}</PokemonName>
      <PokemonImage src={pokemon.sprites.front_default} alt={pokemon.name} />

      <SectionTitle>Movimentos</SectionTitle>
      <ListMoviment>
        {pokemon.moves.slice(0, visibleMoves).map((move) => (
          <ListItem key={move.move.url} theme={theme}>
            {move.move.name}
          </ListItem>
        ))}
      </ListMoviment>

      {/* Botão para carregar mais movimentos */}
      {visibleMoves < pokemon.moves.length && (
        <LoadMoreButton onClick={() => setVisibleMoves(visibleMoves + 10)}>
          Carregar mais
        </LoadMoreButton>
      )}

      <SectionTitle>Habilidades</SectionTitle>
      <List>
        {abilities.map((ability) => (
          <ListItem key={ability.name} theme={theme}>
            <strong>{ability.name}:</strong>
            <AbilityDescription>{ability.description}</AbilityDescription>
          </ListItem>
        ))}
      </List>

      <SectionTitle>Tipos</SectionTitle>
      <List>
        {pokemon.types.map((type) => (
          <ListItem key={type.type.url} theme={theme}>
            {type.type.name}
          </ListItem>
        ))}
      </List>

      <Link to="/">
        <Button>Home</Button>
      </Link>
    </Container>
  );
}

export default PokemonDetail;