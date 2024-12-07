import { ChatronResponse, UserQuery, ConversationContext } from '../../types';
import { responseGenerator } from './responseGenerator';
import { personality } from './personality';

export class ChatronCore {
  private context: ConversationContext = {
    userExpertise: 'beginner',
    conversationHistory: [],
    sessionPreferences: {},
  };

  private analyzeQuery(query: UserQuery): void {
    const technicalTerms = this.extractTechnicalTerms(query.content);
    this.context.userExpertise = this.determineExpertiseLevel(technicalTerms);
  }

  private extractTechnicalTerms(content: string): string[] {
    return content.toLowerCase().match(/\b(api|sdk|framework|runtime|backend|frontend|quantum|neural|algorithm)\b/g) || [];
  }

  private determineExpertiseLevel(terms: string[]): 'beginner' | 'intermediate' | 'advanced' {
    const uniqueTerms = new Set(terms);
    if (uniqueTerms.size > 5) return 'advanced';
    if (uniqueTerms.size > 2) return 'intermediate';
    return 'beginner';
  }

  public async processQuery(query: UserQuery): Promise<ChatronResponse> {
    this.analyzeQuery(query);
    
    this.context.conversationHistory.push({
      type: 'user',
      content: query.content,
      timestamp: Date.now(),
    });

    const emotionalState = {
      primary: 'intellectual',
      intensity: 0.8,
    };

    const response = responseGenerator.generateResponse(query, emotionalState);
    
    this.context.conversationHistory.push({
      type: 'ai',
      content: response.content,
      timestamp: Date.now(),
    });

    return response;
  }
}

export const chatron = new ChatronCore();