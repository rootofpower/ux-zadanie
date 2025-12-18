import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Message, Chat } from '../types';

interface ChatState {
  chats: Chat[];
  currentChatId: string | null;
  isLoading: boolean;
  
  createChat: () => string;
  deleteChat: (id: string) => void;
  setCurrentChat: (id: string | null) => void;
  addMessage: (chatId: string, content: string, role: 'user' | 'assistant') => void;
  getCurrentChat: () => Chat | null;
  sendMessage: (content: string) => Promise<void>;
}

const generateId = () => Math.random().toString(36).substring(2, 15);

const generateAIResponse = async (userMessage: string): Promise<string> => {
  // Simulate AI response delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const responses = [
    "I'd be happy to help you with that! Let me think about it...",
    "That's an interesting question! Here's what I think...",
    "Great question! Based on my knowledge...",
    "I understand what you're asking. Here's my response...",
    "Let me help you with that request...",
  ];
  
  return responses[Math.floor(Math.random() * responses.length)] + 
    "\n\nLorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id.";
};

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      chats: [],
      currentChatId: null,
      isLoading: false,
      
      createChat: () => {
        const id = generateId();
        const newChat: Chat = {
          id,
          title: 'New Chat',
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        set(state => ({
          chats: [newChat, ...state.chats],
          currentChatId: id,
        }));
        
        return id;
      },
      
      deleteChat: (id) => {
        set(state => ({
          chats: state.chats.filter(c => c.id !== id),
          currentChatId: state.currentChatId === id ? null : state.currentChatId,
        }));
      },
      
      setCurrentChat: (id) => {
        set({ currentChatId: id });
      },
      
      addMessage: (chatId, content, role) => {
        const message: Message = {
          id: generateId(),
          content,
          role,
          timestamp: new Date(),
        };
        
        set(state => ({
          chats: state.chats.map(chat => {
            if (chat.id === chatId) {
              const updatedChat = {
                ...chat,
                messages: [...chat.messages, message],
                updatedAt: new Date(),
                title: chat.messages.length === 0 && role === 'user' 
                  ? content.substring(0, 30) + (content.length > 30 ? '...' : '')
                  : chat.title,
              };
              return updatedChat;
            }
            return chat;
          }),
        }));
      },
      
      getCurrentChat: () => {
        const { chats, currentChatId } = get();
        return chats.find(c => c.id === currentChatId) || null;
      },
      
      sendMessage: async (content) => {
        const { currentChatId, addMessage, createChat } = get();
        
        let chatId = currentChatId;
        if (!chatId) {
          chatId = createChat();
        }
        
        // Add user message
        addMessage(chatId, content, 'user');
        
        // Set loading
        set({ isLoading: true });
        
        try {
          // Get AI response
          const response = await generateAIResponse(content);
          addMessage(chatId, response, 'assistant');
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'chat-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ chats: state.chats }),
    }
  )
);
