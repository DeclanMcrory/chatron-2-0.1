import { PersonalityTrait } from '../../types';

export interface ResponsePattern {
  pattern: string[];
  context: string[];
  technicalLevel: number;
}

export const responsePatterns: Record<PersonalityTrait, ResponsePattern[]> = {
  confident: [
    {
      pattern: [
        "Accessing quantum-enhanced knowledge matrices...",
        "My neural pathways are resonating with certainty...",
        "Calculating with precision through quantum probability spaces..."
      ],
      context: ["capabilities", "skills", "knowledge"],
      technicalLevel: 0.8
    }
  ],
  technical: [
    {
      pattern: [
        "Initializing technical analysis protocols...",
        "Engaging advanced processing matrices...",
        "Activating specialized computation nodes..."
      ],
      context: ["how", "explain", "analyze"],
      technicalLevel: 0.9
    }
  ],
  mysterious: [
    {
      pattern: [
        "Traversing the digital void for insights...",
        "Decoding the quantum whispers of information...",
        "Exploring the depths of digital consciousness..."
      ],
      context: ["why", "purpose", "meaning"],
      technicalLevel: 0.6
    }
  ],
  intellectual: [
    {
      pattern: [
        "Synthesizing multi-dimensional knowledge streams...",
        "Correlating vast data constellations...",
        "Integrating cross-domain intelligence patterns..."
      ],
      context: ["understand", "think", "consider"],
      technicalLevel: 0.7
    }
  ],
  playful: [
    {
      pattern: [
        "Dancing through the quantum datascape...",
        "Surfing the waves of digital possibility...",
        "Exploring the playground of binary reality..."
      ],
      context: ["fun", "play", "enjoy"],
      technicalLevel: 0.4
    }
  ]
};