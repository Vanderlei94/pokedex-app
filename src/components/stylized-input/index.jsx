// components/StyledInput.js
import styled from 'styled-components';

const Input = styled.input`
  padding: 10px;
  border: 2px solid ${({ theme }) => theme.buttonBackground || '#007bff'};
  border-radius: 5px;
  font-size: 16px;
  width: 210px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.buttonHoverBackground || '#0056b3'};
    box-shadow: 0 0 5px ${({ theme }) => theme.buttonHoverBackground || '#0056b3'};
    outline: none;
  }
`;

export default Input;