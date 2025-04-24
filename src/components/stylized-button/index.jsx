// components/Button.js
import styled from 'styled-components';

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.buttonBackground || '#007bff'};
  color: ${({ theme }) => theme.buttonColor || '#ffffff'};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin: 10px; // Margem padrão para espaçamento
  display: inline-block;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHoverBackground || '#0056b3'};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default Button;
