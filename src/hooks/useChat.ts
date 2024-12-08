import { useState } from 'react';
import { chatService } from '../services/api';

export interface Message {
  type: 'user' | 'bot';
  content: string;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (content: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Add user message immediately
      setMessages(prev => [...prev, { type: 'user', content }]);
      
      // First, retrieve relevant context
      const context = await chatService.retrieveContext(content);
      
      // Then, get the chat response
      const { response } = await chatService.sendMessage(content);
      
      // Add bot response
      setMessages(prev => [...prev, { type: 'bot', content: response }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
    setError(null);
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
  };
}