import React from 'react';
import { Box, Button, Typography, useTheme, useMediaQuery, CircularProgress } from '@mui/material';
import { Sparkles } from 'lucide-react';
import { useSuggestions } from '../hooks/useSuggestions';

interface SuggestedQueriesProps {
  onSelect: (query: string) => void;
}

export function SuggestedQueries({ onSelect }: SuggestedQueriesProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { suggestions, isLoading, error } = useSuggestions();

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', color: 'error.main' }}>
        <Typography>Failed to load suggestions</Typography>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box sx={{ textAlign: 'center' }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      width: '100%', 
      maxWidth: 'md', 
      px: { xs: 1, sm: 2 },
      mx: 'auto'
    }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1, 
        mb: 2,
        justifyContent: isMobile ? 'center' : 'flex-start'
      }}>
        <Sparkles size={16} color="#0ea5e9" />
        <Typography color="text.secondary" fontWeight={500}>
          Try these questions
        </Typography>
      </Box>
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 1,
        justifyContent: 'center'
      }}>
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            onClick={() => onSelect(suggestion)}
            variant="outlined"
            color="primary"
            size={isMobile ? "medium" : "large"}
            sx={{
              borderRadius: 'full',
              textTransform: 'none',
              animation: 'fadeIn 0.5s ease-out',
              animationDelay: `${index * 100}ms`,
              fontSize: { xs: '0.875rem', sm: '1rem' },
              whiteSpace: 'normal',
              textAlign: 'left',
              height: 'auto',
              padding: { xs: '8px 16px', sm: '8px 24px' },
            }}
          >
            {suggestion}
          </Button>
        ))}
      </Box>
    </Box>
  );
}