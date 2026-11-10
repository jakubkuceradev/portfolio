export const profile = {
  name: 'Jakub Kučera',
  role: 'Software engineer · Prague',
  intro:
    'I build practical software, from robotics systems and AI applications to web products. Studying Informatics at FIT CTU and working at ententee.',
  links: [
    { label: 'Email', href: 'mailto:jakubkuceradev@gmail.com', text: 'jakubkuceradev@gmail.com' },
    { label: 'GitHub', href: 'https://github.com/jakubkuceradev', text: 'github.com/jakubkuceradev' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jakubkuceradev/', text: 'in/jakubkuceradev' },
  ],
  /** Shown as plain text, not interactive skills. */
  spokenLanguages: ['Czech (native)', 'English (C2, Cambridge CAE)'],
} as const;
