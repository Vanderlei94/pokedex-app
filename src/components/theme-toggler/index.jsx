import React from 'react';
import { useTheme } from '../../contexts/theme-context';
import Button from '../stylized-button';

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
      <Button onClick={toggleTheme}>
          Alternar para {theme === 'light' ? 'escuro' : 'claro'}
      </Button>
  );
}
