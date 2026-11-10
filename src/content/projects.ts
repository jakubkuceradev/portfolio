import type { Entry } from './types';

export const projects: readonly Entry[] = [
  {
    id: 'monte-carlo',
    title: 'Stock Portfolio Monte Carlo Simulator',
    context: 'Personal project',
    date: '2025',
    href: 'https://github.com/jakubkuceradev/portfolio-trajectory-python',
    summary: 'Simulates a realistic range of portfolio outcomes for investing and retirement planning.',
    bullets: [
      {
        text: 'Models market volatility with Monte Carlo simulation in NumPy and pandas.',
        skills: ['simulation', 'python', 'data-analysis'],
      },
      {
        text: 'Exposes the simulations through a FastAPI backend with a React front end.',
        skills: ['web-apis', 'react'],
      },
      {
        text: 'Covers the simulation code with automated pytest tests.',
        skills: ['testing', 'python'],
      },
    ],
  },
  {
    id: 'farkle-ai',
    title: 'AI Agents for Farkle',
    context: 'Personal project',
    date: '2025',
    href: 'https://github.com/jakubkuceradev/farkle-ai',
    summary: 'A multi-agent environment for the Farkle dice game and agents that play it.',
    bullets: [
      {
        text: 'Implemented the full game rules in Python and wrapped them as a PettingZoo multi-agent environment.',
        skills: ['python', 'reinforcement-learning'],
      },
      {
        text: 'Trained a PPO agent through self-play with Ray RLlib and PyTorch, using a reduced action space and sparse win/loss rewards.',
        skills: ['reinforcement-learning', 'deep-learning'],
      },
      {
        text: 'Compared it against naive and expected-value heuristic agents over AI-vs-AI matches.',
        skills: ['simulation'],
      },
    ],
  },
];
