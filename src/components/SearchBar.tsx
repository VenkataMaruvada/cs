import React, { useState } from 'react';
import { Paper, InputBase, IconButton, useTheme, useMediaQuery, CircularProgress } from '@mui/material';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export function SearchBar({ onSearch, isLoading = false }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query);
      setQuery('');
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      elevation={0}
      sx={{
        display: 'flex',
        alignItems: 'center',
        px: { xs: 1.5, sm: 2 },
        py: { xs: 0.5, sm: 1 },
        borderRadius: { xs: 2, sm: 3 },
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <InputBase
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask me anything..."
        disabled={isLoading}
        sx={{
          ml: { xs: 0.5, sm: 1 },
          flex: 1,
          fontSize: { xs: '0.875rem', sm: '1rem' },
        }}
      />
      <IconButton 
        type="submit" 
        disabled={isLoading}
        sx={{ 
          p: { xs: 0.5, sm: 1 },
          '& svg': {
            width: isMobile ? 18 : 20,
            height: isMobile ? 18 : 20,
          }
        }} 
        color="primary"
      >
        {isLoading ? (
          <CircularProgress size={20} color="inherit" />
        ) : (
          <Search />
        )}
      </IconButton>
    </Paper>
  );
}