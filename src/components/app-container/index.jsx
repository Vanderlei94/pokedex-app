import styled from 'styled-components';
import backgroundImage from '../../assets/projeto-pokemon.png';

const AppContainer = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;  // Adicione esta linha
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.overlay};
    transition: background-color 0.3s ease;
  }

  & > * {
    position: relative;
    z-index: 1;
  }
`;

export default AppContainer;
