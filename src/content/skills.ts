/**
 * The single list of interactive skills. Every bullet tag must be one of these
 * ids (enforced by the type system), and every skill must be used by at least
 * one bullet (enforced by content.test.ts).
 */
export const skillGroups = ['Languages', 'Software & systems', 'Data & AI', 'Engineering practice'] as const;
export type SkillGroup = (typeof skillGroups)[number];

export const skills = [
  { id: 'python', label: 'Python', group: 'Languages' },
  { id: 'cpp', label: 'C++', group: 'Languages' },
  { id: 'typescript', label: 'TypeScript', group: 'Languages' },
  { id: 'sql', label: 'SQL', group: 'Languages' },
  { id: 'r', label: 'R', group: 'Languages' },

  { id: 'react', label: 'React', group: 'Software & systems' },
  { id: 'web-apis', label: 'Web APIs', group: 'Software & systems' },
  { id: 'docker', label: 'Docker', group: 'Software & systems' },
  { id: 'robotics', label: 'Robotics', group: 'Software & systems' },

  { id: 'machine-learning', label: 'Machine learning', group: 'Data & AI' },
  { id: 'deep-learning', label: 'Deep learning', group: 'Data & AI' },
  { id: 'reinforcement-learning', label: 'Reinforcement learning', group: 'Data & AI' },
  { id: 'llm-applications', label: 'LLM applications', group: 'Data & AI' },
  { id: 'time-series', label: 'Time-series forecasting', group: 'Data & AI' },
  { id: 'data-analysis', label: 'Data analysis', group: 'Data & AI' },
  { id: 'simulation', label: 'Statistics & simulation', group: 'Data & AI' },

  { id: 'testing', label: 'Testing', group: 'Engineering practice' },
  { id: 'teamwork', label: 'Agile teamwork', group: 'Engineering practice' },
  { id: 'presenting', label: 'Presenting', group: 'Engineering practice' },
] as const satisfies readonly { id: string; label: string; group: SkillGroup }[];

export type Skill = (typeof skills)[number];
export type SkillId = Skill['id'];
