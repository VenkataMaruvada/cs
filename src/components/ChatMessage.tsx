import React from 'react';
import { Paper, Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: {
    type: 'user' | 'bot';
    content: string;
  };
}

export function ChatMessage({ message }: ChatMessageProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isUser = message.type === 'user';

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'start',
        gap: { xs: 1, sm: 2 },
        flexDirection: isUser ? 'row-reverse' : 'row',
        mx: { xs: 1, sm: 2 },
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: { xs: 0.5, sm: 1 },
          borderRadius: '50%',
          background: isUser
            ? 'linear-gradient(135deg, #0ea5e9, #0284c7)'
            : 'linear-gradient(135deg, #d946ef, #c026d3)',
        }}
      >
        {isUser ? (
          <User size={isMobile ? 16 : 20} color="white" />
        ) : (
          <Bot size={isMobile ? 16 : 20} color="white" />
        )}
      </Paper>
      <Paper
        elevation={1}
        sx={{
          px: { xs: 2, sm: 3 },
          py: { xs: 1, sm: 1.5 },
          maxWidth: { xs: '85%', sm: '80%' },
          borderRadius: { xs: 3, sm: 4 },
          bgcolor: isUser ? 'primary.main' : 'background.paper',
        }}
      >
        <Typography
          sx={{
            color: isUser ? 'white' : 'text.primary',
            fontSize: { xs: '0.875rem', sm: '1rem' },
            lineHeight: 1.5,
            wordBreak: 'break-word',
          }}
        >
          {message.content}
        </Typography>
      </Paper>
    </Box>
  );
}