import type { Entry } from './types';

/**
 * PLACEHOLDER CONTENT. Every entry below is sample coursework (`placeholder: true`)
 * written to show the layout. Replace it with real courses before relying on it.
 */
const bachelors = "FIT CTU · Bachelor's in Informatics, AI (Sep 2023 – Jun 2026)";
const masters = "FIT CTU · Master's in Informatics (Sep 2026 – Present)";

export const coursework: readonly Entry[] = [
  {
    id: 'course-ml',
    placeholder: true,
    title: 'Machine Learning',
    context: bachelors,
    date: '2024',
    summary: 'Supervised and unsupervised learning, model evaluation.',
    bullets: [
      {
        text: 'Implemented decision trees and linear models from scratch and compared them with scikit-learn.',
        skills: ['machine-learning', 'python'],
      },
      {
        text: 'Ran exploratory analysis and feature engineering on tabular datasets.',
        skills: ['data-analysis'],
      },
    ],
  },
  {
    id: 'course-databases',
    placeholder: true,
    title: 'Database Systems',
    context: bachelors,
    date: '2024',
    summary: 'Relational modelling and SQL.',
    bullets: [
      {
        text: 'Designed a normalised relational schema and queried it with SQL joins, aggregates and window functions.',
        skills: ['sql'],
      },
    ],
  },
  {
    id: 'course-cpp',
    placeholder: true,
    title: 'Programming in C++',
    context: bachelors,
    date: '2023',
    bullets: [
      {
        text: 'Built a semester project in modern C++ with unit tests.',
        skills: ['cpp', 'testing'],
      },
    ],
  },
  {
    id: 'course-deep-learning',
    placeholder: true,
    title: 'Deep Learning',
    context: masters,
    date: '2026',
    summary: 'Neural network architectures and training.',
    bullets: [
      {
        text: 'Trained convolutional and transformer models in PyTorch.',
        skills: ['deep-learning', 'python'],
      },
    ],
  },
];
