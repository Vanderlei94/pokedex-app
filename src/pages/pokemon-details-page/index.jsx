import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPokemonDetails, fetchAbilityDescription } from '../../services/requestApi';
import { useTheme } from '../../contexts/theme-context';
import Button from '../../components/stylized-button';
import {
  Container,
  PokemonName,
  PokemonImage,
  SectionTitle,
  List,
  ListMoviment,
  ListItem,
  AbilityDescription,
  LoadMoreButton,
} from './styles';

function PokemonDetail() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [abilities, setAbilities] = useState([]);
  const { theme } = useTheme();
  const [visibleMoves, setVisibleMoves] = useState(10);

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