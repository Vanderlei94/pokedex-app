import styled from 'styled-components';
import Button from '../../components/stylized-button';

export const Container = styled.div`
  padding: 20px;
  text-align: center;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  color: ${(props) => (props.theme === 'light' ? '#000000' : '#ffffff')};
`;

export const PokemonName = styled.h1`
  color: ${(props) => (props.theme === 'light' ? '#333' : '#ffffff')};
  text-transform: capitalize;
  margin-bottom: 20px;
  margin-right: 30px;
`;

export const PokemonImage = styled.img`
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
`;

export const SectionTitle = styled.h2`
  color: #007bff;
  margin-top: 20px;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 10px auto;
  max-width: 300px;
`;

export const ListMoviment = styled.ul`
  list-style: none;
  margin: 10px auto;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
`;

export const ListItem = styled.li`
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

export const AbilityDescription = styled.span`
  display: block;
  font-size: 14px;
  margin-top: 5px;
`;

export const LoadMoreButton = styled(Button)`
  margin-top: 15px;
`;