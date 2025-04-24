import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
`;


export const ListItem = styled.li`
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

export const PokemonLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  text-align: center;
`;

export const PokemonImage = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
`;

export const PokemonName = styled.span`
  font-size: 18px;
  font-weight: bold;
  text-transform: capitalize;
`;