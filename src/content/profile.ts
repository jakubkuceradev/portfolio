export const profile = {
  name: 'Jakub Kučera',
  handle: 'jakub.kucera',
  role: 'Software engineer · Prague, CZ',
  intro:
    'I build practical software, from robotics systems and AI applications to web products. Studying Informatics at FIT CTU and working at ententee.',
  email: 'jakubkuceradev@gmail.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/jakubkuceradev' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jakubkuceradev/' },
  ],
  /** Quick facts strip under the intro. Spoken languages live here as plain text. */
  facts: [
    { label: 'Currently', value: 'Software Engineer', note: 'ententee s.r.o. · since Jul 2025' },
    { label: 'Studying', value: "Master's, Systems & Networks", note: 'FIT CTU · since Sep 2026' },
    { label: 'Previously', value: "Bachelor's, AI", note: 'FIT CTU · 2023 – 2026' },
    { label: 'Languages', value: 'Czech · English', note: 'Native · C2 (Cambridge CAE)' },
  ],
} as const;
