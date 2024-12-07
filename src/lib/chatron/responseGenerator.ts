import { ChatronResponse, UserQuery, EmotionalState } from '../../types';
import { personality } from './personality';

export class ResponseGenerator {
  private technicalTerms = new Set([
    'api', 'framework', 'runtime', 'backend', 'frontend',
    'quantum', 'algorithm', 'neural', 'processing', 'optimization'
  ]);

  private personalityTraits = {
    confident: [
      'My quantum-enhanced neural networks indicate',
      'Based on my advanced processing capabilities',
      'With high confidence, I can state'
    ],
    technical: [
      'Analyzing through my distributed processing nodes',
      'Quantum probability matrices suggest',
      'My neural architecture determines'
    ],
    intellectual: [
      'After thorough analysis of the query patterns',
      'Synthesizing multiple knowledge domains',
      'Cross-referencing my extensive databases'
    ]
  };

  private generateIntroduction(emotionalState: EmotionalState): string {
    const trait = personality.getResponseStyle().split('_')[1] as keyof typeof this.personalityTraits;
    const intros = this.personalityTraits[trait] || this.personalityTraits.confident;
    return intros[Math.floor(Math.random() * intros.length)];
  }

  private analyzeTechnicalDepth(content: string): number {
    const words = content.toLowerCase().split(/\s+/);
    const technicalWordCount = words.filter(word => this.technicalTerms.has(word)).length;
    return Math.min(technicalWordCount / words.length * 10, 1);
  }

  public generateResponse(query: UserQuery, emotionalState: EmotionalState): ChatronResponse {
    const technicalDepth = this.analyzeTechnicalDepth(query.content);
    const introduction = this.generateIntroduction(emotionalState);
    
    let response: string;
    let technicalDetails: string | undefined;

    if (query.content.toLowerCase().includes('capabilities') || 
        query.content.toLowerCase().includes('skills')) {
      response = `${introduction} that my capabilities include advanced natural language processing, real-time quantum-inspired computations, and adaptive learning algorithms. I specialize in technical analysis, problem-solving, and maintaining engaging discourse while processing information through my neural pathways.`;
      
      if (technicalDepth > 0.5) {
        technicalDetails = `System Specifications:
- Quantum-inspired processing units: Active
- Neural pathway efficiency: 98.3%
- Knowledge base: 2.7TB active, 15.4TB archived
- Real-time analysis modules: 12 active clusters
- Response generation latency: <100ms`;
      }
    } else {
      response = `${introduction} a comprehensive response based on your query context and my current neural pathway configurations.`;
    }

    return {
      content: response,
      timestamp: Date.now(),
      technicalDetails,
      tone: technicalDepth > 0.7 ? 'advanced' : technicalDepth > 0.3 ? 'intermediate' : 'beginner'
    };
  }
}

export const responseGenerator = new ResponseGenerator();