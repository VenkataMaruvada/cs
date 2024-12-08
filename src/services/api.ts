import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ChatResponse {
  response: string;
  confidence: number;
}

export interface SuggestionsResponse {
  suggestions: string[];
}

export const chatService = {
  async sendMessage(message: string): Promise<ChatResponse> {
    try {
      const response = await api.post('/chat', { message });
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error('Failed to send message');
    }
  },

  async getSuggestions(): Promise<SuggestionsResponse> {
    try {
      const response = await api.get('/suggest');
      return response.data;
    } catch (error) {
      console.error('Error getting suggestions:', error);
      throw new Error('Failed to load suggestions');
    }
  },

  async retrieveContext(query: string): Promise<string[]> {
    try {
      const response = await api.get('/retrieve', { params: { query } });
      return response.data.context;
    } catch (error) {
      console.error('Error retrieving context:', error);
      throw new Error('Failed to retrieve context');
    }
  },
};