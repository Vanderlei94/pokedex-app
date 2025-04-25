import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from './index'; 

test('renderiza o input com placeholder', () => {
  render(<Input placeholder="Digite aqui..." />);
  expect(screen.getByPlaceholderText('Digite aqui...')).toBeInTheDocument();
});

test('permite digitação no input', () => {
  render(<Input placeholder="Pesquisar..." />);
  const input = screen.getByPlaceholderText('Pesquisar...');
  fireEvent.change(input, { target: { value: 'pikachu' } });
  expect(input.value).toBe('pikachu');
});
