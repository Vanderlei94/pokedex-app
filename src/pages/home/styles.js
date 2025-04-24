import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  text-align: center;
  color: ${(props) => (props.theme === 'light' ? '#000000' : '#ffffff')};
  max-width: 1200px;
  margin: 0 auto;
`;

export const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
  font-weight: bold;
  background-color: #ffe6e6;
  padding: 10px;
  border-radius: 5px;
`;