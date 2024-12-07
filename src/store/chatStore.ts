import { create } from 'zustand';
import { ChatronResponse, UserQuery } from '../types';
import { chatron } from '../lib/chatron/core';
import { personality } from '../lib/chatron/personality';
import { ethics } from '../lib/chatron/ethics';

interface ChatState {
  messages: (ChatronResponse | UserQuery)[];
  isProcessing: boolean;
  sendMessage: (content: string) => Promise<void>;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  isProcessing: false,

  sendMessage: async (content: string) => {
    if (!ethics.validateQuery(content)) {
      const ethicalResponse = ethics.generateEthicalResponse(content);
      set(state => ({
        messages: [...state.messages, { content: ethicalResponse, timestamp: Date.now() }],
      }));
      return;
    }

    set({ isProcessing: true });

    const userQuery: UserQuery = {
      content,
      timestamp: Date.now(),
    };

    set(state => ({
      messages: [...state.messages, userQuery],
    }));

    try {
      personality.adjustTone(content);
      const response = await chatron.processQuery(userQuery);
      
      set(state => ({
        messages: [...state.messages, response],
        isProcessing: false,
      }));
    } catch (error) {
      set(state => ({
        messages: [
          ...state.messages,
          {
            content: 'My neural pathways encountered an unexpected anomaly. Please try again.',
            timestamp: Date.now(),
          },
        ],
        isProcessing: false,
      }));
    }
  },
}));