import axios from 'axios';

export const fetchPokemonDetails = async (name) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar detalhes do Pokémon:", error);
    return null;
  }
};

export const fetchAbilityDescription = async (abilityUrl) => {
  try {
    const response = await axios.get(abilityUrl);
    const ability = response.data;
    const englishEntry = ability.effect_entries.find(entry => entry.language.name === 'en');
    return englishEntry ? englishEntry.effect : 'Descrição não disponível';
  } catch (error) {
    console.error("Erro ao buscar descrição da habilidade:", error);
    return 'Erro ao buscar descrição';
  }
};