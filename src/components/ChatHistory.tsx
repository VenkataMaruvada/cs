import React from 'react';
import { ChatMessage } from './ChatMessage';

interface ChatHistoryProps {
  messages: Array<{
    type: 'user' | 'bot';
    content: string;
  }>;
}

export function ChatHistory({ messages }: ChatHistoryProps) {
  return (
    <div className="flex-1 overflow-y-auto space-y-4 p-4">
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
    </div>
  );
}