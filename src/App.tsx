import React from 'react';
import { Paper, Container, AppBar, Toolbar, Typography, Box, Alert, Snackbar } from '@mui/material';
import { MessageSquare, Sparkles } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { ChatHistory } from './components/ChatHistory';
import { SuggestedQueries } from './components/SuggestedQueries';
import { ThemeToggle } from './components/ThemeToggle';
import { useTheme } from './theme/ThemeContext';
import { useChat } from './hooks/useChat';

function App() {
  const { mode } = useTheme();
  const { messages, isLoading, error, sendMessage, clearMessages } = useChat();

  const handleSearch = async (query: string) => {
    await sendMessage(query);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        transition: 'background-color 0.3s ease',
      }}
    >
      <AppBar position="sticky" elevation={0} color="inherit">
        <Toolbar>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              flexGrow: 1,
              maxWidth: 'lg',
              margin: '0 auto',
              width: '100%',
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 1,
                borderRadius: 2,
                background: 'linear-gradient(45deg, #0ea5e9, #d946ef)',
              }}
            >
              <MessageSquare color="white" size={24} />
            </Paper>
            <Typography
              variant="h6"
              component="h1"
              sx={{
                background: 'linear-gradient(45deg, #0ea5e9, #d946ef)',
                backgroundClip: 'text',
                color: 'transparent',
                fontWeight: 600,
              }}
            >
              Conversational Search
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <ThemeToggle />
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, minHeight: 'calc(100vh - 128px)' }}>
          {messages.length === 0 ? (
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
              }}
            >
              <Box sx={{ textAlign: 'center', px: 2 }}>
                <Paper
                  elevation={2}
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    p: 2,
                    borderRadius: 'full',
                    mb: 2,
                  }}
                >
                  <Sparkles color={mode === 'light' ? '#0ea5e9' : '#38bdf8'} size={24} />
                  <Typography
                    variant="h5"
                    sx={{
                      background: 'linear-gradient(45deg, #0ea5e9, #d946ef)',
                      backgroundClip: 'text',
                      color: 'transparent',
                      fontWeight: 600,
                    }}
                  >
                    Welcome to AI Chat
                  </Typography>
                </Paper>
                <Typography color="text.secondary" sx={{ maxWidth: 'md', mx: 'auto' }}>
                  Experience intelligent conversations. Ask anything or try our suggested questions below.
                </Typography>
              </Box>
              <SuggestedQueries onSelect={handleSearch} />
            </Box>
          ) : (
            <ChatHistory messages={messages} />
          )}
          
          <Box sx={{ position: 'sticky', bottom: 16, px: 2 }}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                borderRadius: 4,
                backdropFilter: 'blur(8px)',
                bgcolor: mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(30, 41, 59, 0.8)',
              }}
            >
              <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            </Paper>
          </Box>
        </Box>
      </Container>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => clearMessages()}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default App;