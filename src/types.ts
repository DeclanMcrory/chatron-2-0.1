export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: number;
  isCode?: boolean;
  codeLanguage?: string;
  confidence?: number;
}

export interface EmotionalState {
  primary: 'neutral' | 'happy' | 'thoughtful' | 'processing' | 'playful' | 'helpful' | 'empathetic' | 'intellectual';
  intensity: number;
}

export interface SystemStatus {
  energyLevel: number;
  processingState: 'idle' | 'thinking' | 'responding';
  connectionStatus: 'connected' | 'disconnected';
  temperature: number;
  confidenceLevel: number;
}

export interface ThoughtProcess {
  id: string;
  type: 'reasoning' | 'analysis' | 'synthesis' | 'quantum';
  content: string;
}

export interface UserQuery {
  content: string;
  timestamp: number;
}

export interface ChatronResponse {
  content: string;
  timestamp: number;
  technicalDetails?: string;
  tone: 'beginner' | 'intermediate' | 'advanced';
}

export interface ConversationContext {
  userExpertise: 'beginner' | 'intermediate' | 'advanced';
  conversationHistory: Array<{
    type: 'user' | 'ai';
    content: string;
    timestamp: number;
  }>;
  sessionPreferences: Record<string, unknown>;
}

export type PersonalityTrait = 
  | 'confident'
  | 'technical'
  | 'mysterious'
  | 'intellectual'
  | 'playful';