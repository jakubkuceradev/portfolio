import type { Entry } from './types';

export const experience: readonly Entry[] = [
  {
    id: 'ententee',
    title: 'Software Engineer',
    context: 'ententee s.r.o.',
    date: 'Jul 2025 – Present',
    summary: 'Client software across robotics, AI applications and medical web products.',
    bullets: [
      {
        text: 'Develop robotics software in Python and C++ on ROS 2, with simulation in Gazebo.',
        skills: ['robotics', 'python', 'cpp'],
      },
      {
        text: 'Built a robust robot-logging platform and handled integration between robot subsystems.',
        skills: ['robotics', 'python'],
      },
      {
        text: 'Build Python APIs with FastAPI and Django.',
        skills: ['python', 'web-apis'],
      },
      {
        text: 'Build AI applications, including retrieval-augmented generation (RAG) systems.',
        skills: ['llm-applications', 'python'],
      },
      {
        text: 'Package services with Docker and deploy them to virtual machines.',
        skills: ['docker'],
      },
      {
        text: 'Develop React and Python medical software in an Agile team, working with US-based client engineers and product and project managers.',
        skills: ['react', 'python', 'teamwork'],
      },
      {
        text: 'Debugged TypeScript and React form-saving logic spanning GraphQL, client caching and Zustand state.',
        skills: ['typescript', 'react', 'web-apis'],
      },
    ],
  },
  {
    id: 'orea-hackathon',
    title: 'Winning Team Member',
    context: 'OREA Hotel-Pricing Hackathon',
    date: '2025',
    summary: 'Won with the ententee team by building room-pricing curves for revenue managers.',
    bullets: [
      {
        text: 'Cleaned and explored hotel booking data with pandas to prepare it for modelling.',
        skills: ['data-analysis', 'python'],
      },
      {
        text: 'Trained LightGBM models behind the room-pricing curves.',
        skills: ['machine-learning', 'python'],
      },
      {
        text: 'Built time-series models, including Temporal Fusion Transformers.',
        skills: ['time-series', 'deep-learning'],
      },
      {
        text: "Presented the team's approach and its business value to the OREA judges.",
        skills: ['presenting'],
      },
    ],
  },
];
