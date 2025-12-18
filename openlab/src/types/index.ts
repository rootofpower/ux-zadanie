export interface User {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
}

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export type AppMode = 'voice' | 'chat';

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';
