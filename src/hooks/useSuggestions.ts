import { useState, useEffect } from 'react';
import { chatService } from '../services/api';

const DEFAULT_SUGGESTIONS = [
  "What's the weather like today?",
  "Tell me about artificial intelligence",
  "How does machine learning work?",
  "What are the latest technology trends?"
];

export function useSuggestions() {
  const [suggestions, setSuggestions] = useState<string[]>(DEFAULT_SUGGESTIONS);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadSuggestions = async () => {
      try {
        setIsLoading(true);
        const response = await chatService.getSuggestions();
        if (mounted) {
          setSuggestions(response.suggestions);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to load suggestions');
          console.error('Suggestions error:', err);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadSuggestions();

    return () => {
      mounted = false;
    };
  }, []);

  return { 
    suggestions, 
    isLoading, 
    error 
  };
}