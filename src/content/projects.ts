import type { Entry } from './types';

/**
 * Sources: ~/Projects/cv/knowledge/experience/projects.md and public GitHub
 * metadata. Portfolio Trajectory's FastAPI backend and web frontend were never
 * implemented (user correction, Oct 2026) — describe only the simulation work.
 */
export const projects: readonly Entry[] = [
  {
    id: 'monte-carlo',
    title: 'Portfolio Trajectory',
    context: 'Personal project',
    date: '2025 – 2026',
    href: 'https://github.com/jakubkuceradev/portfolio-trajectory-python',
    summary: 'Simulates a realistic range of portfolio outcomes for investing and retirement planning.',
    bullets: [
      {
        text: 'Designed a Monte Carlo engine in Python with NumPy and pandas that models market volatility.',
        skills: ['simulation', 'python'],
      },
      {
        text: 'Generates probabilistic scenarios and summarises them as percentile outcome metrics.',
        skills: ['simulation', 'data-analysis'],
      },
      {
        text: 'Covers the simulation code with automated pytest tests.',
        skills: ['testing', 'python'],
      },
      {
        text: 'Extending it into a life-cycle investing simulator based on historical bootstrap sampling.',
        skills: ['simulation'],
      },
    ],
  },
  {
    id: 'farkle-ai',
    title: 'AI Agents for Farkle',
    context: 'Personal project',
    date: '2025',
    href: 'https://github.com/jakubkuceradev/farkle-ai',
    summary: 'Reinforcement-learning agents for the Farkle dice game, plus the environment they train in.',
    bullets: [
      {
        text: 'Trained a PPO agent through self-play with Ray RLlib and PyTorch, using a reduced action space and sparse win/loss rewards.',
        skills: ['reinforcement-learning', 'deep-learning'],
      },
      {
        text: 'Wrapped the full game rules as a standardised PettingZoo multi-agent environment for training and evaluation.',
        skills: ['reinforcement-learning', 'python'],
      },
      {
        text: 'Benchmarked the agent against naive and expected-value heuristic agents over simulated AI-vs-AI matches.',
        skills: ['simulation'],
      },
      {
        text: 'Built a playable Pygame interface, with rules, agents, simulation and user interaction kept as separate modules.',
        skills: ['python'],
      },
    ],
  },
  {
    id: 'fashion-mnist',
    title: 'Fashion-MNIST Classification',
    context: 'Data science project',
    date: '2025',
    href: 'https://github.com/jakubkuceradev/fashion-mnist-classification',
    summary: 'Two studies applying different machine-learning techniques to clothing-image classification.',
    bullets: [
      {
        text: 'Explored and preprocessed the image data with pandas, NumPy and Matplotlib.',
        skills: ['data-analysis', 'python'],
      },
      {
        text: 'Built a scikit-learn pipeline with scaling and dimensionality reduction ahead of classical classifiers.',
        skills: ['machine-learning', 'python'],
      },
      {
        text: 'Compared and evaluated feedforward and convolutional neural networks in PyTorch.',
        skills: ['deep-learning', 'machine-learning'],
      },
    ],
  },
  {
    id: 'regression-analysis',
    title: 'Biological Data Regression Analysis',
    context: 'Data science project',
    date: '2025',
    href: 'https://github.com/jakubkuceradev/regression-analysis',
    summary: 'Statistical analysis of fly-wing-ratio data from the Sleuth2 dataset.',
    bullets: [
      {
        text: 'Fitted linear-regression models in R, using dplyr for data preparation and ggplot2 for plots.',
        skills: ['r', 'data-analysis'],
      },
      {
        text: 'Verified model assumptions and evaluated statistical significance.',
        skills: ['simulation', 'r'],
      },
    ],
  },
  {
    id: 'coffee-guide',
    title: 'Interactive Coffee Guide',
    context: 'Personal project',
    date: '2024',
    href: 'https://github.com/jakubkuceradev/knowYourCoffee',
    summary: 'A website for learning about different coffee beverages.',
    bullets: [
      {
        text: 'Built a React and TypeScript web app with Vite from custom components styled with styled-components.',
        skills: ['react', 'typescript'],
      },
      {
        text: 'Designed the application structure, state management and data flow between components.',
        skills: ['react'],
      },
    ],
  },
];
